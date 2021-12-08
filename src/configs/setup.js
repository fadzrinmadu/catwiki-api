const multer = require('multer');

module.exports = (app) => {
  app.use(multer().array());
};
