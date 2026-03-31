# 图片背景移除工具 🎨

一个基于 Remove.bg API 的图片背景移除 Web 应用，支持拖拽上传和实时预览对比。

## ✨ 核心功能

- 🖼️ **图片上传**: 支持拖拽和点击上传 JPG/PNG 格式图片
- 🎨 **背景移除**: 使用 Remove.bg API 自动移除图片背景
- 👁️ **实时预览**: 原图与处理结果对比显示
- 💾 **PNG下载**: 一键下载处理后的 PNG 图片
- 📱 **响应式设计**: 完美适配移动端和桌面端
- ⚡ **快速处理**: 响应时间 < 3 秒
- 🔄 **状态反馈**: 实时显示处理进度和结果
- 🎯 **性能监控**: 详细的处理时间统计

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **后端**: Cloudflare Workers
- **API**: Remove.bg API
- **部署**: Cloudflare Pages + Workers
- **CI/CD**: GitHub Actions

## 🚀 快速开始

### 1. 配置 API 密钥

首先，获取你的 [Remove.bg API 密钥](https://www.remove.bg/api)

编辑 `wrangler.toml` 文件：
```toml
[env.production]
vars = { API_KEY = "your_actual_remove_bg_api_key_here" }
```

### 2. 安装依赖

```bash
npm install
```

### 3. 本地开发

```bash
npm run dev
```

### 4. 部署上线

```bash
# 使用 Wrangler CLI
npm run deploy

# 或使用 GitHub Actions (推荐)
# 推送代码到 main 分支自动部署
```

## 📊 API 端点

### 健康检查
```
GET /health
```
返回服务状态和运行时间。

### 图片处理
```
POST /process
Content-Type: multipart/form-data

Parameters:
- image: 图片文件 (必需)
- format: 输出格式 (默认: png)
```

**响应头包含性能指标:**
- `X-Processing-Time`: 总处理时间
- `X-API-Response-Time`: API 响应时间

## 🎯 使用说明

1. **上传图片**: 拖拽图片到上传区域或点击选择文件
2. **等待处理**: 系统自动调用 Remove.bg API 处理图片
3. **查看结果**: 左侧显示原图，右侧显示处理后的无背景图
4. **下载图片**: 点击"下载 PNG"按钮保存结果

## 📋 技术规格

- **部署**: Cloudflare Pages + Workers
- **API**: Remove.bg API
- **处理**: 内存模式，无存储
- **格式**: JPG/PNG 输入，PNG 输出
- **最大文件**: 25MB

## 📱 项目结构

```
image-background-remover/
├── 📄 README.md                 # 项目说明
├── 📄 DEPLOYMENT.md            # 部署指南
├── 📄 TESTING.md               # 测试文档
├── 📄 .gitignore               # Git 忽略文件
├── 📄 config.json              # 配置文件
├── 📄 index.html               # 主页面
├── 📄 public/index.html        # 静态资源
├── 📄 worker.js                # Cloudflare Worker
├── 📄 wrangler.toml           # Wrangler 配置
├── 📄 package.json             # 项目依赖
└── 📁 .github/workflows/       # GitHub Actions
    └── deploy.yml              # 自动部署配置
```

## 🎨 用户体验设计

- 🖼️ **简洁的双视图对比**
- ⚡ **实时状态反馈**
- 🔄 **友好的错误提示**
- 📱 **移动端适配**
- 📊 **详细的性能统计**

## 📈 成功指标

- ✅ 处理成功率 > 95%
- ⚡ 响应时间 < 3 秒
- ⭐ 用户满意度 > 4.5/5
- 🌐 全球访问速度优化

## 🔧 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 预览部署
npm run preview
```

## 🚀 部署选项

### 选项 1: Wrangler CLI
```bash
# 登录 Cloudflare
wrangler login

# 部署
wrangler deploy --env production
```

### 选项 2: GitHub Actions (推荐)
1. 在 GitHub 仓库设置中添加 Secrets：
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

2. 推送代码到 main 分支，自动部署

## 📞 支持

### 获取帮助
1. 查看 [Remove.bg API 文档](https://www.remove.bg/api/docs)
2. 检查 [Cloudflare 文档](https://developers.cloudflare.com/pages/)
3. 提交 GitHub Issue
4. 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 详细部署指南

### 常见问题
- **API 密钥配置错误**: 检查 `wrangler.toml` 中的 API_KEY
- **处理失败**: 检查网络连接和 API 配额
- **性能问题**: 确认图片大小和网络延迟

## 📝 开发计划

### Phase 1: 基础开发 ✅
- 核心功能实现
- 用户界面设计
- API 集成

### Phase 2: 测试优化 ✅
- 性能测试
- 错误处理优化
- 用户体验改进

### Phase 3: 部署上线 ✅
- Cloudflare 部署
- 监控配置
- 域名配置

### Phase 4: 迭代改进 🔄
- 用户反馈收集
- 功能增强
- 性能优化

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**立即开始使用**: [配置 API 密钥 → 部署上线 → 开始处理图片](./DEPLOYMENT.md)