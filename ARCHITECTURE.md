# 图片背景移除工具 - 项目架构文档

## 📋 项目概述

这是一个基于 Node.js + React 的专业图片背景移除工具，支持批量处理、用户管理、多种API集成。项目遵循现代化开发规范，具备高可扩展性和安全性。

## 🏗️ 系统架构

### 整体架构
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端 (React)   │────│  后端 (Node.js)  │────│   数据库 (SQLite)  │
│                │    │                │    │                │
│ - 用户界面       │    │ - Express API   │    │ - 用户数据       │
│ - 文件上传       │    │ - 文件处理      │    │ - 处理历史       │
│ - 结果展示       │    │ - API集成       │    │ - 配额管理       │
│ - 状态管理       │    │ - 安全防护      │    │ - 日志记录       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   用户浏览器     │    │   文件存储       │    │   业务逻辑       │
│                │    │                │    │                │
│ - Chrome/Firefox │    │ - 临时文件       │    │ - Remove.bg API  │
│ - Safari/Edge   │    │ - 处理结果       │    │ - 图片处理       │
│ - 移动设备      │    │ - 自动清理       │    │ - 批量操作       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 技术选型

### 前端技术栈
| 技术 | 用途 | 优势 |
|------|------|------|
| React | 用户界面 | 组件化开发，生态丰富 |
| Webpack | 模块打包 | 代码分割，热更新 |
| Babel | 代码编译 | ES6+转译，浏览器兼容 |
| TailwindCSS | 样式框架 | 实用优先，快速开发 |
| Fabric.js | 图片处理 | 高性能图形操作 |

### 后端技术栈
| 技术 | 用途 | 优势 |
|------|------|------|
| Node.js | 运行时 | 异步非阻塞，高性能 |
| Express | Web框架 | 轻量级，中间件丰富 |
| Multer | 文件上传 | 处理multipart/form-data |
| Sharp | 图片处理 | 高性能，格式支持多 |
| SQLite | 数据库 | 轻量级，无需安装 |
| JWT | 认证 | 无状态，易于扩展 |

### API集成
| API | 类型 | 特点 | 成本 |
|-----|------|------|------|
| Remove.bg | 专业背景移除 | 效果好，稳定 | 免费50次/月 |
| Stable Diffusion | 本地AI模型 | 可定制，离线 | 服务器成本 |
| BackgroundRemover.ai | 替代方案 | 价格便宜 | 按需付费 |

## 📁 目录结构

```
image-background-remover/
├── src/
│   ├── server.js          # Express服务器主文件
│   ├── client.js          # React前端主文件
│   └── utils/             # 工具函数
│       ├── fileUtils.js   # 文件处理工具
│       ├── apiUtils.js    # API调用工具
│       └── validation.js  # 数据验证工具
├── tests/
│   ├── api.test.js        # API测试
│   ├── utils.test.js      # 工具函数测试
│   └── setup.js          # 测试环境设置
├── public/
│   ├── index.html         # 主页面
│   ├── bundle.js          # 打包后的JS
│   └── styles/            # 样式文件
├── uploads/               # 临时上传文件
├── results/               # 处理结果文件
├── logs/                  # 日志文件
├── config.json           # 配置文件
├── package.json          # 项目依赖
├── webpack.config.js     # Webpack配置
├── jest.config.js        # Jest测试配置
├── .env.example          # 环境变量模板
├── .gitignore           # Git忽略文件
└── README.md             # 项目说明
```

## 🚀 开发流程

### 1. 环境准备
```bash
# 克隆项目
git clone <repository-url>
cd image-background-remover

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
nano .env
```

### 2. 开发模式
```bash
# 启动开发服务器
npm run dev

# 开发服务器在 http://localhost:3000
# 前端热更新在 http://localhost:8080
```

### 3. 测试
```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- --watch

# 生成测试覆盖率报告
npm run test:coverage
```

### 4. 构建
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 🔧 核心功能实现

### 文件上传处理
```javascript
// 使用 multer 处理文件上传
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
```

### API集成
```javascript
// Remove.bg API 集成
async function processWithRemoveBg(imagePath) {
  const formData = new FormData();
  formData.append('image', fs.createReadStream(imagePath));
  formData.append('size', 'auto');
  formData.append('format', 'png');

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': process.env.REMOVE_BG_API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Remove.bg API 调用失败');
  }

  return response.buffer();
}
```

### 批量处理
```javascript
// 批量处理逻辑
app.post('/api/batch-process', upload.array('images', 10), async (req, res) => {
  const results = [];
  
  for (const file of req.files) {
    try {
      const processedImage = await processImage(file.path);
      results.push({
        success: true,
        original: file.originalname,
        processed: `results/${file.originalname}_no_background.png`
      });
    } catch (error) {
      results.push({
        success: false,
        original: file.originalname,
        error: error.message
      });
    }
  }

  res.json({
    success: true,
    total: req.files.length,
    processed: results.filter(r => r.success).length,
    results: results
  });
});
```

## 📊 性能优化

### 前端优化
1. **代码分割**: 使用 Webpack 分割代码
2. **图片懒加载**: 大图片延迟加载
3. **缓存策略**: 使用 localStorage 缓存用户数据
4. **防抖处理**: 避免频繁的 API 调用

### 后端优化
1. **连接池**: 数据库连接复用
2. **内存管理**: 及时清理临时文件
3. **并发控制**: 限制同时处理的任务数
4. **缓存机制**: Redis 缓存热门图片处理结果

## 🛡️ 安全考虑

### 文件安全
- **类型验证**: 严格的文件类型检查
- **大小限制**: 防止大文件攻击
- **病毒扫描**: 可选集成杀毒软件
- **路径安全**: 防止路径遍历攻击

### API安全
- **限流保护**: 防止API滥用
- **CORS配置**: 限制跨域访问
- **HTTPS强制**: 数据传输加密
- **API密钥保护**: 环境变量存储

### 用户数据安全
- **JWT认证**: 无状态认证
- **密码加密**: bcrypt 加密存储
- **数据备份**: 定期备份数据库
- **审计日志**: 记录重要操作

## 📈 监控和日志

### 性能监控
- **响应时间**: API调用时间统计
- **错误率**: 错误请求统计
- **并发数**: 同时处理的任务数
- **资源使用**: CPU、内存使用情况

### 日志记录
```javascript
// 日志配置
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
```

## 🚀 部署方案

### 开发环境
- **本地运行**: Node.js 开发服务器
- **热重载**: Webpack 开发服务器
- **调试工具**: Node.js Inspector

### 生产环境
- **容器化**: Docker 容器部署
- **反向代理**: Nginx 负载均衡
- **进程管理**: PM2 进程管理
- **监控告警**: Prometheus + Grafana

### 云部署
- **AWS**: EC2 + S3 + RDS
- **Azure**: Web App + Blob Storage
- **Google Cloud**: GKE + Cloud Storage

## 🔄 扩展计划

### 第一阶段：MVP (已完成)
- ✅ 基础上传功能
- ✅ 单张图片处理
- ✅ 简单的前端界面
- ✅ API集成

### 第二阶段：增强功能
- 🔄 用户注册/登录系统
- 🔄 批量处理优化
- 🔄 历史记录管理
- 🔄 多种输出格式

### 第三阶段：商业化
- 🔄 订阅系统
- 🔄 API配额管理
- 🔄 支付集成
- 🔄 企业级功能

## 📞 技术支持

### 开发资源
- [Node.js 文档](https://nodejs.org/docs/)
- [React 文档](https://react.dev/)
- [Express 文档](https://expressjs.com/)
- [Remove.bg API 文档](https://www.remove.bg/api)

### 调试技巧
1. **查看日志**: 检查 logs/ 目录
2. **浏览器开发者**: 前端错误分析
3. **Node.js 调试**: 使用 --inspect 参数
4. **网络抓包**: 使用 Fiddler 或 Charles

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

**架构设计完成**: [项目已按照现代化架构实现，具备良好的可扩展性和安全性](#项目架构)