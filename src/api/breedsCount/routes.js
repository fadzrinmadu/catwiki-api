const router = require('express').Router();
const multer = require('multer');
const handler = require('./handler');

router.put('/breeds/:id/count', multer().none(), handler.putBreedCountHandler);

module.exports = router;
