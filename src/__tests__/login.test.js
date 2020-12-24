require('dotenv').config();
const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const {getUserByEmail} = require('../db/users-db');

jest.mock('../db/users-db');
jest.mock('jsonwebtoken');

beforeEach(() => {
  getUserByEmail.mockReset();
  jwt.sign.mockReset();
});

test('login with invalid email', (done) => {
  request(app)
    .post('/login')
    .send({email: 'invalid.mail', password: ''})
    .expect(400)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(res.body.message).toBe('The email is invalid');
      done();
    });
});

test('login with invalid credentials', (done) => {
  getUserByEmail.mockReturnValueOnce(null);
  const email = 'john@mail.com';

  request(app)
    .post('/login')
    .send({email, password: '123'})
    .expect(401)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(getUserByEmail).toHaveBeenCalledTimes(1);
      expect(getUserByEmail).toHaveBeenCalledWith(email);
      expect(res.body.message).toBe('email or password incorrect');
      done();
    });
});

test('login with valid credentials', (done) => {
  const email = 'john@mail.com';
  const token = 'testpass';
  getUserByEmail.mockReturnValueOnce(email);
  jwt.sign.mockReturnValueOnce(token);

  request(app)
    .post('/login')
    .send({email, password: '123'})
    .expect(200)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(getUserByEmail).toHaveBeenCalledTimes(1);
      expect(getUserByEmail).toHaveBeenCalledWith(email);
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({token});
      done();
    });
});
