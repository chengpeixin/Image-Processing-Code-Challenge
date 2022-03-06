import request from 'supertest';
import App from '@/app';
import IndexRoute from '@routes/index.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('测试传输图片是否成功', () => {
  describe('[GET] /img/photo-2.jpg', () => {
    it('response statusCode 200', () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);
      return request(app.getServer()).get(`${indexRoute.path}img/photo-2.jpg`).expect(200);
    });
  });
});

describe('测试输入不存在的图片', () => {
  describe('[GET] /img/test.jpg', () => {
    it('response statusCode 404', () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);
      return request(app.getServer()).get(`${indexRoute.path}img/test.jpg`).expect(404);
    });
  });
});