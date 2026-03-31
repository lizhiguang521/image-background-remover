const worker = {
  async fetch(request, env, ctx) {
    const startTime = Date.now();
    const url = new URL(request.url);
    
    // Add CORS headers to all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }
    
    // Handle health check endpoint
    if (request.method === 'GET' && url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Date.now() - startTime,
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
    
    // Handle POST requests for image processing
    if (request.method === 'POST' && url.pathname === '/process') {
      try {
        // Performance monitoring
        const processingStartTime = Date.now();
        
        // Check if API key is configured
        if (!env.API_KEY || env.API_KEY === 'your_remove_bg_api_key_here') {
          const error = {
            error: 'API key not configured',
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - startTime,
          };
          return new Response(JSON.stringify(error), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          });
        }
        
        // Validate request
        if (!request.body) {
          const error = {
            error: 'Invalid request body',
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - startTime,
          };
          return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          });
        }
        
        // Get the uploaded file
        const formData = await request.formData();
        const file = formData.get('image');
        
        if (!file) {
          const error = {
            error: 'No image file provided',
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - startTime,
          };
          return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          });
        }
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          const error = {
            error: `Unsupported file type: ${file.type}. Supported types: ${allowedTypes.join(', ')}`,
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - startTime,
          };
          return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          });
        }
        
        // Validate file size (25MB limit)
        const maxSize = 25 * 1024 * 1024; // 25MB
        if (file.size > maxSize) {
          const error = {
            error: `File size too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`,
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - startTime,
          };
          return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          });
        }
        
        // Call Remove.bg API
        const formDataForRemoveBg = new FormData();
        formDataForRemoveBg.append('image', file, {
          contentType: file.type,
          filename: file.name,
        });
        formDataForRemoveBg.append('size', 'auto');
        formDataForRemoveBg.append('format', 'png');
        
        const apiStartTime = Date.now();
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': env.API_KEY,
          },
          body: formDataForRemoveBg,
        });
        const apiResponseTime = Date.now() - apiStartTime;
        
        if (!response.ok) {
          const errorText = await response.text();
          const error = {
            error: `Remove.bg API error: ${errorText}`,
            status: response.status,
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - startTime,
            apiResponseTime: apiResponseTime,
          };
          return new Response(JSON.stringify(error), {
            status: response.status,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          });
        }
        
        const resultBuffer = await response.arrayBuffer();
        const totalProcessingTime = Date.now() - startTime;
        
        // Log performance metrics
        console.log({
          event: 'image_processed',
          timestamp: new Date().toISOString(),
          fileSize: file.size,
          processingTime: totalProcessingTime,
          apiResponseTime: apiResponseTime,
          success: true,
        });
        
        // Return the processed image
        return new Response(resultBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="no-background.png"',
            'X-Processing-Time': totalProcessingTime.toString(),
            'X-API-Response-Time': apiResponseTime.toString(),
            ...corsHeaders,
          },
        });
        
      } catch (error) {
        const errorResponse = {
          error: error.message || 'Internal server error',
          timestamp: new Date().toISOString(),
          processingTime: Date.now() - startTime,
        };
        console.error('Processing error:', errorResponse);
        
        return new Response(JSON.stringify(errorResponse), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }
    }
    
    // Handle other requests
    return new Response(JSON.stringify({ 
      error: 'Endpoint not found',
      availableEndpoints: ['/health', '/process'],
      timestamp: new Date().toISOString(),
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  },
};

export default worker;