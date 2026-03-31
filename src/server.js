const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// 配置
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 限流配置
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100次请求
  message: {
    error: '请求过于频繁，请稍后再试',
    retryAfter: 900
  }
});
app.use('/api/', limiter);

// 文件上传配置
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('不支持的文件类型'), false);
    }
  }
});

// API路由
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 图片处理路由
app.post('/api/process', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: '未选择图片文件',
        code: 'NO_FILE'
      });
    }

    const startTime = Date.now();
    const fileExtension = path.extname(req.file.originalname);
    const fileName = req.file.originalname.replace(fileExtension, '');
    
    // 这里可以集成 Remove.bg API 或其他专业 API
    // 暂时使用模拟处理
    const processedImage = await processImage(req.file.path);
    
    const resultPath = `results/${fileName}_no_background${fileExtension}`;
    await fs.rename(req.file.path, resultPath);
    
    const processingTime = Date.now() - startTime;
    
    res.json({
      success: true,
      original: {
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
      },
      processed: {
        name: fileName + '_no_background' + fileExtension,
        path: resultPath,
        size: processedImage.size,
        processingTime: processingTime
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('处理错误:', error);
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        console.error('清理临时文件失败:', e);
      }
    }
    
    res.status(500).json({
      error: error.message || '图片处理失败',
      code: 'PROCESS_ERROR'
    });
  }
});

// 批量处理路由
app.post('/api/batch-process', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: '未选择图片文件',
        code: 'NO_FILES'
      });
    }

    const results = [];
    const startTime = Date.now();
    
    for (const file of req.files) {
      try {
        const processedImage = await processImage(file.path);
        const resultPath = `results/${file.originalname.replace(path.extname(file.originalname), '')}_no_background${path.extname(file.originalname)}`;
        await fs.rename(file.path, resultPath);
        
        results.push({
          success: true,
          original: file.originalname,
          processed: resultPath,
          size: processedImage.size
        });
      } catch (error) {
        results.push({
          success: false,
          original: file.originalname,
          error: error.message
        });
        await fs.unlink(file.path).catch(() => {});
      }
    }
    
    const processingTime = Date.now() - startTime;
    
    res.json({
      success: true,
      total: req.files.length,
      processed: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results: results,
      processingTime: processingTime,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      error: error.message || '批量处理失败',
      code: 'BATCH_ERROR'
    });
  }
});

// 获取处理结果
app.get('/api/result/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../results', filename);
    
    if (!await fs.access(filePath).then(() => true).catch(() => false)) {
      return res.status(404).json({
        error: '文件不存在',
        code: 'FILE_NOT_FOUND'
      });
    }
    
    const stats = await fs.stat(filePath);
    const ext = path.extname(filename);
    
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('下载文件失败:', err);
        res.status(500).json({
          error: '文件下载失败',
          code: 'DOWNLOAD_ERROR'
        });
      }
    });
    
  } catch (error) {
    res.status(500).json({
      error: error.message || '获取文件失败',
      code: 'GET_ERROR'
    });
  }
});

// 获取API配额信息
app.get('/api/quota', (req, res) => {
  res.json({
    used: 25, // 已使用次数
    total: 50, // 总配额
    remaining: 25, // 剩余次数
    period: 'monthly', // 配额周期
    resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 重置日期
  });
});

// 模拟图片处理函数
async function processImage(inputPath) {
  // 这里应该集成 Remove.bg API 或其他专业 API
  // 暂时模拟处理
  const sharp = require('sharp');
  
  const outputBuffer = await sharp(inputPath)
    .resize(800, 600)
    .png()
    .toBuffer();
  
  return {
    size: outputBuffer.length,
    buffer: outputBuffer
  };
}

// 确保目录存在
async function ensureDirectories() {
  const dirs = ['uploads', 'results'];
  for (const dir of dirs) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      console.error(`创建目录失败 ${dir}:`, error);
    }
  }
}

// 启动服务器
async function startServer() {
  await ensureDirectories();
  
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
    console.log(`健康检查: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch(console.error);