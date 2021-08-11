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

    async getGeojsonCtprvnByExtent(req, res) {
        try {
            const { extent } = req.query;
            const geojson = await shpService.getGeojsonCtprvnByExtent(extent);
            res.status(200).send(geojson);
        } catch (e) {
            res.status(500).send('server error');
        }
    },
    async getGeojsonSigByExtent(req, res) {
        try {
            const { extent } = req.query;
            const geojson = await shpService.getGeojsonSigByExtent(extent);
            res.status(200).send(geojson);
        } catch (e) {
            res.status(500).send('server error');
        }
    }

}