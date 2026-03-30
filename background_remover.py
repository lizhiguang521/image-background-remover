#!/usr/bin/env python3
"""
Image Background Remover
"""

import argparse
import os
import sys
from typing import Optional

try:
    import cv2
    import numpy as np
    from PIL import Image
except ImportError as e:
    print(f"Error: Missing required dependency - {e}")
    print("Please install requirements: pip install -r requirements.txt")
    sys.exit(1)


class BackgroundRemover:
    """AI图像背景移除工具"""
    
    def __init__(self):
        self.model = None
        self._load_model()
    
    def _load_model(self):
        """加载AI模型"""
        # 这里可以加载预训练的模型
        # 目前使用OpenCV的基础背景分割
        print("Loading background removal model...")
    
    def remove_background(self, input_path: str, output_path: Optional[str] = None) -> str:
        """
        移除图像背景
        
        Args:
            input_path: 输入图像路径
            output_path: 输出图像路径（可选）
        
        Returns:
            输出图像路径
        """
        if not os.path.exists(input_path):
            raise FileNotFoundError(f"Input file not found: {input_path}")
        
        # 如果没有指定输出路径，使用默认命名
        if output_path is None:
            name, ext = os.path.splitext(input_path)
            output_path = f"{name}_no_bg{ext}"
        
        try:
            # 读取图像
            image = cv2.imread(input_path)
            if image is None:
                raise ValueError(f"Could not read image: {input_path}")
            
            # 转换为RGB
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            
            # 简单的背景检测（实际项目中应该使用更复杂的AI模型）
            # 这里使用简单的颜色阈值作为示例
            result = self._simple_background_removal(image_rgb)
            
            # 保存结果
            output_image = Image.fromarray(result)
            output_image.save(output_path)
            
            print(f"Background removed successfully: {output_path}")
            return output_path
            
        except Exception as e:
            print(f"Error removing background: {e}")
            raise
    
    def _simple_background_removal(self, image: np.ndarray) -> np.ndarray:
        """
        简单的背景移除算法（示例）
        
        实际项目中应该使用更复杂的AI模型
        """
        h, w, c = image.shape
        
        # 创建alpha通道
        alpha = np.ones((h, w), dtype=np.uint8) * 255
        
        # 简单的颜色阈值检测背景
        # 这里假设背景是白色的
        white_threshold = 240
        mask = (image[:, :, 0] < white_threshold) | \
               (image[:, :, 1] < white_threshold) | \
               (image[:, :, 2] < white_threshold)
        
        alpha[~mask] = 0
        
        # 合并RGB通道和alpha通道
        result = np.dstack([image, alpha])
        
        return result


def main():
    """命令行入口"""
    parser = argparse.ArgumentParser(description='Remove image background')
    parser.add_argument('input', help='Input image path')
    parser.add_argument('-o', '--output', help='Output image path')
    parser.add_argument('-v', '--verbose', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    try:
        remover = BackgroundRemover()
        result_path = remover.remove_background(args.input, args.output)
        
        if args.verbose:
            print(f"Processed: {result_path}")
            
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()