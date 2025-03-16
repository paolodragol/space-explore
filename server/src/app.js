const express = require('express');
const planetsRouter = require('./routes/planets/planets.router');

const app = express();

// use built-in express json middleware
app.use(express.json());
app.use(planetsRouter);

module.exports = app;
