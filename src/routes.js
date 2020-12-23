const express = require('express');

const {
  getUsersController,
  getUserByUidController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require('./controllers/users-controller');

const {login} = require('./controllers/auth-controllers');

const api = express.Router();

api.get('/users', getUsersController);
api.get('/users/:uid', getUserByUidController);
api.post('/users', createUserController);
api.put('/users/:uid', updateUserController);
api.delete('/users/:uid', deleteUserController);

api.post('/login', login);

module.exports = api;
