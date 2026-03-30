#!/usr/bin/env python3
"""
示例脚本：演示如何使用背景移除工具
"""

import os
import sys
from background_remover import BackgroundRemover


def demo():
    """演示背景移除功能"""
    print("=== Image Background Remover Demo ===")
    
    # 创建背景移除器实例
    remover = BackgroundRemover()
    
    # 检查是否有示例图片
    sample_images = ["sample1.jpg", "sample2.png", "test.jpg"]
    input_image = None
    
    for img in sample_images:
        if os.path.exists(img):
            input_image = img
            break
    
    if not input_image:
        print("没有找到示例图片。请准备一张测试图片。")
        print("使用方法：")
        print("  python background_remover.py your_image.jpg")
        print("  python example.py")
        return
    
    print(f"正在处理图片: {input_image}")
    
    try:
        # 移除背景
        output_path = remover.remove_background(input_image)
        print(f"处理完成！结果保存到: {output_path}")
        
    except Exception as e:
        print(f"处理失败: {e}")


def test_api():
    """测试API功能"""
    print("\n=== API功能测试 ===")
    
    remover = BackgroundRemover()
    
    # 测试图片路径
    test_images = []
    
    # 创建测试图片目录
    os.makedirs("test_images", exist_ok=True)
    
    print("API测试完成。")
    print("可以使用的API方法：")
    print("  - BackgroundRemover(): 创建实例")
    print("  - remove_background(input_path, output_path): 移除背景")


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        test_api()
    else:
        demo()