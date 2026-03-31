const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }
    
    // Handle POST requests for image processing
    if (request.method === 'POST' && url.pathname === '/process') {
      try {
        // Check if API key is configured
        if (!env.API_KEY || env.API_KEY === 'your_remove_bg_api_key_here') {
          return new Response(JSON.stringify({ error: 'API key not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }
        
        // Get the uploaded file
        const formData = await request.formData();
        const file = formData.get('image');
        
        if (!file) {
          return new Response(JSON.stringify({ error: 'No image file provided' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }
        
        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Call Remove.bg API
        const formDataForRemoveBg = new FormData();
        formDataForRemoveBg.append('image', file, {
          contentType: file.type,
          filename: file.name,
        });
        formDataForRemoveBg.append('size', 'auto');
        formDataForRemoveBg.append('format', 'png');
        
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': env.API_KEY,
          },
          body: formDataForRemoveBg,
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          return new Response(JSON.stringify({ error: `Remove.bg API error: ${errorText}` }), {
            status: response.status,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }
        
        const resultBuffer = await response.arrayBuffer();
        
        // Return the processed image
        return new Response(resultBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="no-background.png"',
            'Access-Control-Allow-Origin': '*',
          },
        });
        
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }
    
    // Handle other requests
    return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  },
};

export default worker;