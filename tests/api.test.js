// 测试服务器健康检查
const request = require('supertest');
const app = require('../src/server');

describe('API Health Check', () => {
  test('GET /api/health should return 200', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});

// 测试图片上传
describe('Image Upload', () => {
  test('POST /api/process should reject no file', async () => {
    const response = await request(app)
      .post('/api/process')
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('code', 'NO_FILE');
  });

  test('POST /api/process should handle invalid file type', async () => {
    const response = await request(app)
      .post('/api/process')
      .attach('image', Buffer.from('invalid'), 'test.txt')
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
  });
});

// 测试配额信息
describe('Quota API', () => {
  test('GET /api/quota should return quota info', async () => {
    const response = await request(app)
      .get('/api/quota')
      .expect(200);
    
    expect(response.body).toHaveProperty('used');
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('remaining');
    expect(response.body).toHaveProperty('period');
    expect(response.body).toHaveProperty('resetDate');
  });
});