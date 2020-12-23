const express = require('express');

const api = express.Router();

api.get('/users', (req, res) => {
  res.status(200).send({users: []});
});

module.exports = api;
