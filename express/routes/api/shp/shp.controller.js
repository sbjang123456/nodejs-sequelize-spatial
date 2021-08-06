'use strict';

const shpService = require('../../../service/shp.service');

module.exports = {
    async uploadCtprvn(req, res) {
        try {
            await shpService.uploadCtprvn(req.files);

            res.status(200).send('ctprvn shp upload success!');
        } catch (e) {
            res.status(500).send('ctprvn shp upload fail!');
        }
    },

    async uploadSig(req, res) {
        try {
            await shpService.uploadSig(req.files);

            res.status(200).send('sig shp upload success!');
        } catch (e) {
            res.status(500).send('sig shp upload fail!');
        }
    },

}