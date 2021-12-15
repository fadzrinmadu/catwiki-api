const router = require('express').Router();
const multer = require('multer');
const handler = require('./handler');

router.post('/breeds', multer().none(), handler.postBreedHandler);
router.get('/breeds', handler.getBreedsHandler);
router.get('/breeds/:id', handler.getBreedByIdHandler);
router.put('/breeds/:id', multer().none(), handler.putBreedByIdHandler);
router.delete('/breeds/:id', handler.deleteBreedByIdHandler);

module.exports = router;
