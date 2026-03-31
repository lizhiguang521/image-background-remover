# 图片背景移除工具

一个基于 Remove.bg API 的图片背景移除 Web 应用，支持拖拽上传和实时预览。

## 功能特性

- 🖼️ **图片上传**: 支持拖拽和点击上传 JPG/PNG 格式图片
- 🎨 **背景移除**: 使用 Remove.bg API 自动移除图片背景
- 👁️ **实时预览**: 原图与处理结果对比显示
- 💾 **PNG下载**: 一键下载处理后的 PNG 图片
- 📱 **响应式设计**: 完美适配移动端和桌面端
- ⚡ **快速处理**: 响应时间 < 3 秒
- 🔄 **状态反馈**: 实时显示处理进度和结果

## 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **后端**: Cloudflare Workers
- **API**: Remove.bg API
- **部署**: Cloudflare Pages + Workers

## 部署步骤

### 1. 配置 API 密钥

编辑 `wrangler.toml` 文件，替换 `your_remove_bg_api_key_here` 为你的 Remove.bg API 密钥：

```toml
vars = { API_KEY = "your_actual_api_key_here" }
```

### 2. 安装依赖

```bash
npm install
```

### 3. 本地开发测试

```bash
npm run dev
```

### 4. 部署到生产环境

```bash
npm run deploy
```

## API 端点

### POST /process

处理上传的图片，移除背景并返回 PNG 格式结果。

**请求参数:**
- `image`: 要处理的图片文件 (Multipart/form-data)

**响应:**
- 成功: 200 OK, 返回 PNG 图片
- 错误: 4xx/5xx, 返回 JSON 错误信息

## 使用说明

1. 上传图片：拖拽图片到上传区域或点击选择文件
2. 等待处理：系统会自动调用 Remove.bg API 处理图片
3. 查看结果：左侧显示原图，右侧显示处理后的无背景图
4. 下载图片：点击"下载 PNG"按钮保存结果

## 支持格式

- **输入**: JPG, JPEG, PNG
- **输出**: PNG
- **最大文件大小**: 25MB

## 项目结构

```
image-background-remover/
├── index.html          # 主页面
├── worker.js           # Cloudflare Worker
├── wrangler.toml       # Wrangler 配置
├── package.json        # 项目配置
└── README.md          # 项目说明
```

## 成功指标

- ✅ 处理成功率 > 95%
- ⚡ 响应时间 < 3 秒
- ⭐ 用户满意度 > 4.5/5

## 注意事项

1. 需要 Remove.bg API 密钥才能正常工作
2. 网络连接到 Remove.bg API 必须稳定
3. 仅支持常见的图片格式
4. 处理大图片可能需要更长时间

## 许可证

MIT License