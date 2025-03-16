const express = require('express');

const app = express();

// use built-in express json middleware
app.use(express.json());

module.exports = app;
