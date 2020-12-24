require('dotenv').config();
const request = require('supertest');

const app = require('../app');

test('Auth - GET /users', (done) => {
  request(app)
    .get('/users')
    .set('Authorization', 'bearer abc123')
    .expect(401)
    .end(function (err) {
      expect(err).toBe(null);
      done();
    });
});

test('Auth - GET /users/abc', (done) => {
  request(app)
    .get('/users/abc')
    .set('Authorization', 'bearer abc123')
    .expect(401)
    .end(function (err) {
      expect(err).toBe(null);
      done();
    });
});

test('Auth - POST /users', (done) => {
  request(app)
    .post('/users')
    .set('Authorization', 'bearer abc123')
    .expect(401)
    .end(function (err) {
      expect(err).toBe(null);
      done();
    });
});

test('Auth - PUT /users', (done) => {
  request(app)
    .put('/users')
    .set('Authorization', 'bearer abc123')
    .expect(401)
    .end(function (err) {
      expect(err).toBe(null);
      done();
    });
});

test('Auth - DELETE /users', (done) => {
  request(app)
    .delete('/users/abc')
    .set('Authorization', 'bearer abc123')
    .expect(401)
    .end(function (err) {
      expect(err).toBe(null);
      done();
    });
});
