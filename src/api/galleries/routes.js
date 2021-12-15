const router = require('express').Router();
const handler = require('./handler');
const { uploadSingleBreed } = require('../../middlewares/multer');

router.post('/breeds/:breedId/galleries', uploadSingleBreed, handler.postGalleryHandler);
router.delete('/breeds/:breedId/galleries/:galleryId', handler.deleteGalleryHandler);

module.exports = router;
