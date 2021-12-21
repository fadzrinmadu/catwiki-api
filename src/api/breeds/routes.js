const router = require('express').Router();
const handler = require('./handler');
const { uploadMultipleBreed } = require('../../middlewares/multer');

router.post('/breeds', uploadMultipleBreed, handler.postBreedHandler);
router.get('/breeds', handler.getBreedsHandler);
router.get('/breeds/:id', handler.getBreedByIdHandler);
router.put('/breeds/:id', uploadMultipleBreed, handler.putBreedByIdHandler);
router.delete('/breeds/:id', handler.deleteBreedByIdHandler);

module.exports = router;
