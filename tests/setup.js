// Jest 测试环境设置
require('dotenv').config({ path: '.env.test' });

// 模拟文件系统
jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(),
    rename: jest.fn(),
    unlink: jest.fn(),
    access: jest.fn(),
    stat: jest.fn()
  }
}));

// 模拟 sharp
jest.mock('sharp', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    resize: jest.fn(() => ({
      png: jest.fn(() => ({
        toBuffer: jest.fn(() => Promise.resolve(Buffer.from('mock')))
      }))
    }))
  }))
}));