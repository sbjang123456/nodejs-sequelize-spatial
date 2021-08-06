'use strict';

const router = require('express').Router();
const shpController = require('./shp.controller');
const multer = require('multer');
const fs = require('fs');

const fileUpload = multer({
    // dest: './tmp/',
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = './tmp';
            !fs.existsSync(dir) && fs.mkdirSync(dir);
            cb(null, './tmp');
        },
        filename: (req, file, cb) => {
            cb(null, `upload.${file.originalname.split('.').pop()}`);
        }
    })
}).array('shapeFile');

router.post('/ctprvn', fileUpload, shpController.uploadCtprvn);
router.post('/sig', fileUpload, shpController.uploadSig);

module.exports = router;