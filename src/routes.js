const express = require('express');

const {
  getUsersController,
  getUserByUidController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require('./controllers/users-controller');

const api = express.Router();

api.get('/users', getUsersController);
api.get('/users/:uid', getUserByUidController);
api.post('/users', createUserController);
api.put('/users/:uid', updateUserController);
api.delete('/users/:uid', deleteUserController);

module.exports = api;
