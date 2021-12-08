const breedsRoutes = require('../api/breeds/routes');

module.exports = (app) => {
  app.use('/api/v1', breedsRoutes);
};
