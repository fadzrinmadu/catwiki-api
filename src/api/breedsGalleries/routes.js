const router = require('express').Router();
const handler = require('./handler');

router.delete('/breeds/:breedId/galleries/:galleryId', handler.deleteBreedGalleryHandler);

module.exports = router;
