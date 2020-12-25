require('dotenv').config();
const request = require('supertest');
const jwt = require('jsonwebtoken');

const {secret} = require('../config');
const app = require('../app');
const {
  getUsers,
  getUserByUid,
  addUser,
  updateUser,
  deleteUser,
} = require('../db/users-db');
const {buildUser} = require('../helpers/builders');

const token = jwt.sign({}, secret);

jest.mock('../db/users-db');

beforeEach(() => {
  getUsers.mockReset();
  getUserByUid.mockReset();
  addUser.mockReset();
  updateUser.mockReset();
  deleteUser.mockReset();
});

test('GET /users - get all users', (done) => {
  const users = [buildUser(), buildUser(), buildUser()];
  getUsers.mockReturnValueOnce(users);

  request(app)
    .get('/users')
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(res.body).toEqual({users});
      done();
    });
});

test('GET /users/abc - get specific user by uuid', (done) => {
  const user = buildUser();
  const userUuid = 'abc';
  getUserByUid.mockReturnValueOnce(user);

  request(app)
    .get(`/users/${userUuid}`)
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(getUserByUid).toHaveBeenCalledTimes(1);
      expect(getUserByUid).toHaveBeenCalledWith(userUuid);
      expect(res.body).toEqual({user});
      done();
    });
});

test('POST /users - store new user', (done) => {
  const user = buildUser();
  addUser.mockReturnValueOnce(user);

  request(app)
    .post('/users')
    .set('Authorization', `bearer ${token}`)
    .send({name: user.name, title: user.title})
    .expect(201)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(addUser).toHaveBeenCalledTimes(1);
      expect(addUser).toHaveBeenCalledWith({
        name: user.name,
        title: user.title,
      });
      expect(res.body).toEqual({user});
      done();
    });
});

test('PUT /users - update current user by uuid', (done) => {
  const user = buildUser();
  const userUuid = 'abc';
  updateUser.mockReturnValueOnce(user);

  request(app)
    .put(`/users/${userUuid}`)
    .set('Authorization', `bearer ${token}`)
    .send({name: user.name, title: user.title})
    .expect(200)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(updateUser).toHaveBeenCalledTimes(1);
      expect(updateUser).toHaveBeenCalledWith({
        name: user.name,
        title: user.title,
        uid: userUuid,
      });
      expect(res.body).toEqual({user});
      done();
    });
});

test('DELETE /users - delete user by uuid', (done) => {
  const userUuid = 'abc';

  request(app)
    .delete(`/users/${userUuid}`)
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(deleteUser).toHaveBeenCalledTimes(1);
      expect(deleteUser).toHaveBeenCalledWith(userUuid);
      expect(res.body).toEqual({});
      done();
    });
});
