const router = require('express').Router();
const handler = require('./handler');

router.post('/breeds', handler.postBreedHandler);
router.get('/breeds', handler.getBreedsHandler);
router.get('/breeds/:id', handler.getBreedByIdHandler);
router.put('/breeds/:id', handler.putBreedByIdHandler);
router.delete('/breeds/:id', handler.deleteBreedByIdHandler);

module.exports = router;
