# Image Background Remover

一个用于移除图像背景的AI工具项目。

## 功能特性

- 🎨 智能背景检测和移除
- 🖼️ 支持多种图片格式（PNG, JPG, JPEG等）
- ⚡ 高效的处理速度
- 🔧 简单易用的API接口

## 技术栈

- Python 3.x
- OpenCV
- TensorFlow/PyTorch
- Pillow

## 安装说明

```bash
# 克隆项目
git clone https://github.com/lizhiguang521/image-background-remover.git

# 进入项目目录
cd image-background-remover

# 安装依赖
pip install -r requirements.txt
```

## 使用方法

### 命令行使用

```bash
python background_remover.py input.jpg output.png
```

### Python API

```python
from background_remover import BackgroundRemover

remover = BackgroundRemover()
result = remover.remove_background("input.jpg", "output.png")
```

## 许可证

MIT License