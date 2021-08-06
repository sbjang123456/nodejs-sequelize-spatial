'use strict';

const router = require('express').Router();
const shp = require('./shp');

router.use('/shp', shp);

module.exports = router;