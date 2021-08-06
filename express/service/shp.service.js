'use strict';
const {db: {tlSccoCtprvn, tlSccoSig}, sequelize, Op} = require('../../sequelize');
const logger = require('../../config/winston')('shp.controller');
const gdal = require('gdal');

const getSpatialDataRows = (shapeFiles) => {
    let results = [];
    const shpFile = shapeFiles.find(e => e.filename.includes('.shp'));
    try {
        const dataset = gdal.open(`${shpFile.destination}/${shpFile.filename}`);
        const layer = dataset.layers.get(0);
        layer.features.forEach((feature, idx) => {
            const params = {};
            feature.fields.forEach((value, key) => {
                params[key.toLowerCase()] = value;
            });

            const geojson = JSON.parse(feature.getGeometry().toJSON());
            geojson.crs = {type: 'name', properties: {name: `EPSG:3857`}};
            params.geom = geojson;
            results.push(params);
        });
    } catch (e) {
        results = [];
    }

    return results;
};

module.exports = {
    async uploadCtprvn(shapeFiles) {
        if (shapeFiles.length === 3) {
            try {
                return await sequelize.transaction(async t => {
                    await tlSccoCtprvn.destroy({where: {}, truncate: true});
                    return await tlSccoCtprvn.bulkCreate(
                        getSpatialDataRows(shapeFiles),
                        {transaction: t}
                    );
                });
            } catch (e) {
                logger.error(e);
                throw e;
            }
        } else {
            throw new Error('require shp, shx, dbf');
        }
    },
    async uploadSig(shapeFiles) {
        if (shapeFiles.length === 3) {
            try {
                return await sequelize.transaction(async t => {
                    await tlSccoSig.destroy({where: {}, truncate: true});
                    return await tlSccoSig.bulkCreate(
                        getSpatialDataRows(shapeFiles),
                        {transaction: t}
                    );
                });
            } catch (e) {
                logger.error(e);
                throw e;
            }
        } else {
            throw new Error('require shp, shx, dbf');
        }
    },

}