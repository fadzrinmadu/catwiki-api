const router = require('express').Router();
const multer = require('multer');
const handler = require('./handler');
const { uploadMultipleBreed } = require('../../middlewares/multer');

router.post('/breeds', uploadMultipleBreed, handler.postBreedHandler);
router.get('/breeds', handler.getBreedsHandler);
router.get('/breeds/:id', handler.getBreedByIdHandler);
router.put('/breeds/:id', uploadMultipleBreed, handler.putBreedByIdHandler);
router.put('/breeds/:id/count', multer().none(), handler.putBreedCountHandler);
router.delete('/breeds/:id', handler.deleteBreedByIdHandler);
router.delete('/breeds/:breedId/galleries/:galleryId', handler.deleteBreedGalleryHandler);

module.exports = router;
