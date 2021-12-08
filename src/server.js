require('dotenv').config();

const express = require('express');
const database = require('./configs/database');
const setup = require('./configs/setup');
const routes = require('./configs/routes');

const app = express();

const port = process.env.PORT;
const host = process.env.HOST;

setup(app);
routes(app);

database.on('error', (error) => {
  console.log(error);
});

database.on('open', () => {
  app.listen(port, () => {
    console.log(`Server running on ${host}:${port}`);
  });
});
