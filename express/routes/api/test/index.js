const router = require('express').Router();
const controller = require('./test.controller');

router.get('/test', controller.getTests);
router.post('/test', controller.postTest);
router.get('/test/:id', controller.getTest);
router.patch('/test/:id', controller.patchTest);
router.put('/test/:id', controller.putTest);
router.delete('/test/:id', controller.deleteTest);

module.exports = router;