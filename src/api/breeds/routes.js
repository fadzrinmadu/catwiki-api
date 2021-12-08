const router = require('express').Router();
const handler = require('./handler');

router.post('/breeds', handler.postBreadHandler);
router.get('/breeds', handler.getBreedsHandler);

module.exports = router;
