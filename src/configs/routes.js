const breedsRoutes = require('../api/breeds/routes');
const galleriesRoutes = require('../api/galleries/routes');

module.exports = (app) => {
  app.use('/api/v1', breedsRoutes);
  app.use('/api/v1', galleriesRoutes);
};
