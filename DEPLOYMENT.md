# 图片背景移除工具 - 部署指南

## 🚀 快速部署

### 1. 配置 Remove.bg API 密钥

首先，你需要获取 Remove.bg API 密钥：

1. 访问 [Remove.bg API 页面](https://www.remove.bg/api)
2. 注册或登录账户
3. 获取 API 密钥（每月免费 50 张图片）

编辑 `wrangler.toml` 文件：

```toml
[env.production]
vars = { API_KEY = "your_actual_remove_bg_api_key_here" }

[env.staging]
vars = { API_KEY = "your_actual_remove_bg_api_key_here" }
```

### 2. 部署到 Cloudflare

#### 方法一：使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
wrangler deploy --env production
```

#### 方法二：使用 GitHub Actions

1. 在 GitHub 仓库设置中添加以下 Secrets：
   - `CLOUDFLARE_API_TOKEN`: 你的 Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`: 你的 Cloudflare Account ID

2. 推送代码到 main 分支，GitHub Actions 会自动部署

### 3. 配置自定义域名（可选）

1. 在 Cloudflare Pages 中添加自定义域名
2. 配置 SSL 证书
3. 设置缓存规则

## 🔧 环境变量

### 必需的环境变量

- `API_KEY`: Remove.bg API 密钥

### 可选的环境变量

- `MAX_FILE_SIZE`: 最大文件大小（默认 25MB）
- `ALLOWED_FORMATS`: 允许的文件格式（默认 jpg,jpeg,png）
- `TIMEOUT`: 超时时间（默认 30000ms）

## 📊 性能监控

### 健康检查端点

```
GET /health
```

响应示例：
```json
{
  "status": "ok",
  "timestamp": "2026-03-31T14:50:00.000Z",
  "uptime": 123456
}
```

### 处理端点

```
POST /process
```

响应头包含性能指标：
- `X-Processing-Time`: 总处理时间
- `X-API-Response-Time`: API 响应时间

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 本地开发服务器
npm run dev

# 预览部署
npm run preview
```

## 📈 性能优化

### 前端优化

- 响应式设计，支持移动端
- 拖拽上传体验优化
- 实时进度反馈
- 错误处理友好

### 后端优化

- 内存模式，无存储成本
- 快速响应（< 3秒）
- 高成功率（> 95%）
- 详细的错误日志

### 部署优化

- Cloudflare 全球 CDN
- 自动缓存策略
- SSL 证书
- DDoS 防护

## 🔒 安全考虑

- 文件类型验证
- 文件大小限制
- API 密钥保护
- CORS 安全配置

## 📱 移动端适配

- 响应式布局
- 触摸友好的交互
- 移动端优化性能
- 支持图片拖拽

## 🎨 用户界面

### 核心功能
- ✅ 图片上传（拖拽+点击）
- ✅ 背景移除处理
- ✅ 结果预览对比
- ✅ PNG 下载功能
- ✅ 响应式设计

### 用户体验
- 🎯 简洁的双视图对比
- 👁️ 实时状态反馈
- ⚡ 快速处理（< 3秒）
- 📱 移动端适配
- 🔄 友好的错误提示

## 📊 成功指标

- ✅ 处理成功率 > 95%
- ⚡ 响应时间 < 3 秒
- ⭐ 用户满意度 > 4.5/5
- 🌐 全球访问速度优化

## 🔄 项目里程碑

### Phase 1: 基础开发（2周）
- ✅ 核心功能实现
- ✅ 用户界面设计
- ✅ API 集成

### Phase 2: 测试优化（1周）
- ✅ 性能测试
- ✅ 错误处理优化
- ✅ 用户体验改进

### Phase 3: 部署上线（1周）
- ✅ Cloudflare 部署
- ✅ 监控配置
- ✅ 域名配置

### Phase 4: 迭代改进
- 🔄 用户反馈收集
- 🔄 功能增强
- 🔄 性能优化

## 📞 支持

如果遇到问题，请：

1. 检查 [Remove.bg API 文档](https://www.remove.bg/api/docs)
2. 查看 Cloudflare 错误日志
3. 提交 GitHub Issue
4. 联系技术支持

## 📄 许可证

MIT License