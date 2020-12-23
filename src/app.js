const express = require('express');
const jwt = require('express-jwt');

const {secret} = require('./config');
const api = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  jwt({
    secret,
    algorithms: ['sha1', 'RS256', 'HS256'],
  }).unless({
    path: ['/login'],
  }),
);
app.use('', api);

module.exports = app;
