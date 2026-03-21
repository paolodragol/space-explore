const request = require('supertest');

const app = require('../../app');

describe('GET /launches', () => {
  it('should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-type', /json/)
      .expect(200);
  });
});

describe('POST /launches', () => {
  it('should respond with 200 success', () => {});

  it('should catch missing requires properties', () => {});
  it('should catch invalid dates', () => {});
});
