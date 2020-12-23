const express = require('express');
const api = require('./routes');

const app = express();

app.use('', api);

module.exports = app;
