require('dotenv').config();

const express = require('express');
const database = require('./configs/database');
const setup = require('./configs/setup');
const routes = require('./configs/routes');
const ClientError = require('./exceptions/ClientError');

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

app.use((error, request, response, next) => {
  if (error instanceof ClientError) {
    response.status(error.statusCode);
    return response.json({
      errorMessages: error.message,
    });
  }

  if (error.name === 'ValidationError') {
    const errorMessages = [];

    Object.values(error.errors).forEach(({ properties }) => {
      errorMessages.push({
        field: properties.path,
        message: properties.message,
      });
    });

    response.status(400);
    return response.json({ errorMessages });
  }

  // SERVER ERROR
  console.log(error);
  response.status(500);
  return next();
});
