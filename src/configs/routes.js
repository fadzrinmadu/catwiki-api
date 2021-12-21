const breedsRoutes = require('../api/breeds/routes');
const breedsCountRoutes = require('../api/breedsCount/routes');
const breedsGalleriesRoutes = require('../api/breedsGalleries/routes');

module.exports = (app) => {
  app.use('/api/v1', breedsRoutes);
  app.use('/api/v1', breedsCountRoutes);
  app.use('/api/v1', breedsGalleriesRoutes);
};
