# 图片背景移除工具 - 专业版

一个基于 Node.js + React 的专业图片背景移除工具，支持批量处理、用户管理、多种API集成。

## 🌟 核心特性

### 前端功能
- 🖼️ **拖拽上传**: 支持多文件拖拽上传，实时预览
- 🎨 **实时处理**: 异步处理，进度可视化
- 📱 **响应式设计**: 完美适配桌面端和移动端
- 🔄 **批量处理**: 一次性处理多张图片
- 📊 **配额管理**: 实时显示API使用情况

### 后端功能
- ⚡ **高性能**: Node.js + Express，支持并发处理
- 🔒 **安全防护**: 文件验证、限流、CORS保护
- 📁 **文件管理**: 自动清理临时文件，节省存储空间
- 🌐 **API集成**: 支持Remove.bg等多个背景移除API
- 📈 **性能监控**: 处理时间统计和错误日志

## 🚀 技术栈

### 前端
- **React**: 用户界面组件化
- **Webpack**: 模块打包工具
- **Babel**: JavaScript 编译器
- **TailwindCSS**: 实用优先的CSS框架
- **Fabric.js**: 图片处理库

### 后端
- **Node.js**: 运行时环境
- **Express**: Web框架
- **Multer**: 文件上传中间件
- **Sharp**: 图片处理库
- **SQLite**: 轻量级数据库
- **JWT**: 用户认证
- **Rate Limit**: 限流保护

### API集成
- **Remove.bg**: 专业背景移除API
- **Stable Diffusion**: 本地AI模型（可选）
- **自定义API**: 扩展支持其他服务商

## 📋 项目结构

```
image-background-remover/
├── src/
│   ├── server.js          # Express服务器
│   └── client.js          # React前端
├── public/
│   └── bundle.js          # 打包后的前端代码
├── uploads/               # 临时上传文件
├── results/               # 处理结果
├── database.sqlite        # SQLite数据库
├── logs/                  # 日志文件
├── package.json           # 项目依赖
├── webpack.config.js      # Webpack配置
├── .env.example           # 环境变量模板
└── README.md             # 项目说明
```

## 🚀 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，填入实际配置
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 构建生产版本
```bash
npm run build
npm start
```

## 🛠️ 配置说明

### Remove.bg API 配置
在 `.env` 文件中配置：
```bash
REMOVE_BG_API_KEY=your_api_key_here
```

### 文件上传配置
```bash
MAX_FILE_SIZE=26214400  # 25MB
UPLOAD_DIR=uploads
RESULT_DIR=results
```

### 速率限制
```bash
RATE_LIMIT_WINDOW_MS=900000  # 15分钟
RATE_LIMIT_MAX_REQUESTS=100   # 最大请求数
```

## 📊 API 端点

### 处理相关
- `POST /api/process` - 单张图片处理
- `POST /api/batch-process` - 批量图片处理
- `GET /api/result/:filename` - 下载处理结果
- `GET /api/quota` - 获取API配额信息

### 系统相关
- `GET /api/health` - 健康检查
- `GET /` - 前端页面

## 🎯 使用场景

### 适用场景
- **电商平台**: 产品图片背景移除
- **设计工作**: Logo和图形处理
- **摄影**: 人像照片背景移除
- **电商**: 商品图批量处理
- **个人使用**: 社交媒体图片优化

### 文件格式支持
- **输入**: JPG, PNG, WebP
- **输出**: PNG, JPG
- **最大文件**: 25MB
- **批量数量**: 10张/次

## 🔧 开发指南

### 添加新的API服务商
1. 在 `src/server.js` 中添加新的API处理函数
2. 配置环境变量
3. 更新前端API调用逻辑

### 扩展功能
- **用户系统**: 添加注册、登录、个人中心
- **订阅管理**: 集成Stripe支付
- **历史记录**: 数据库存储处理历史
- **定时任务**: 自动清理过期文件

### 性能优化
- **缓存**: 使用Redis缓存处理结果
- **队列**: 使用消息队列处理大量文件
- **CDN**: 使用CDN加速文件下载

## 📈 成本估算

### 开发成本
- **时间**: 2-4人月
- **人员**: 1后端 + 1前端 + 1测试

### 运营成本
- **服务器**: $50-200/月
- **API费用**: $20-100/月（根据使用量）
- **CDN**: $10-50/月
- **数据库**: $10-50/月

## 🛡️ 安全考虑

### 文件安全
- 文件类型验证
- 文件大小限制
- 病毒扫描（可选）
- 临时文件自动清理

### API安全
- API密钥保护
- 请求频率限制
- CORS配置
- HTTPS强制

### 用户数据安全
- JWT认证
- 密码加密存储
- 数据备份
- GDPR合规

## 📞 支持

### 技术支持
- 查看 [Remove.bg API文档](https://www.remove.bg/api)
- 提交GitHub Issue
- 查看日志文件排查问题

### 常见问题
- **API配额不足**: 检查API密钥和配额
- **处理失败**: 检查文件格式和大小
- **网络错误**: 检查API连接状态

## 📄 许可证

MIT License

---

**立即开始**: [配置API密钥 → 运行项目 → 开始处理图片](#安装和运行)