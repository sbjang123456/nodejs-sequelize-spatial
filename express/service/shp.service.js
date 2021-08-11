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
            geojson.crs = {type: 'name', properties: {name: `EPSG:5179`}};
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
    },
    async uploadSig(shapeFiles) {
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
    },

    async getGeojsonCtprvnByExtent(extent) {
        try {
            const [minx, miny, maxx, maxy] = extent;
            const geojson = await tlSccoCtprvn.findOne({
                attributes: [
                    [
                        sequelize.fn('json_build_object',
                            'type', 'FeatureCollection', 'features',
                            sequelize.fn('jsonb_agg',
                                sequelize.cast(sequelize.fn('ST_AsGeoJSON', sequelize.col('geom')), 'json')
                            )
                        ),
                        'geojson'
                    ]
                ],
                where: {
                    geom: {
                        [Op.overlap]: sequelize.fn('st_makeenvelope', minx, miny, maxx, maxy)
                    }
                }
            });
            return geojson;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    },
    async getGeojsonSigByExtent(extent) {
        try {
            const [minx, miny, maxx, maxy] = extent;
            const geojson = await tlSccoSig.findOne({
                attributes: [
                    [
                        sequelize.fn('json_build_object',
                            'type', 'FeatureCollection', 'features',
                            sequelize.fn('jsonb_agg',
                                sequelize.cast(sequelize.fn('ST_AsGeoJSON', sequelize.col('tlSccoSig.*')), 'json')
                            )
                        ),
                        'geojson'
                    ]
                ],
                where: {
                    geom: {
                        [Op.overlap]: sequelize.fn('st_makeenvelope', minx, miny, maxx, maxy)
                    }
                }
            });
            return geojson;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    },

    // postgis 3 미만
    // async getGeojsonSigByExtent(extent) {
    //     try {
    //         const [minx, miny, maxx, maxy] = extent;
    //         const results = await sequelize.query(
    //             `select
    //                 row_to_json(fc) as geojson
    //             from
    //                 (
    //                 select
    //                     'FeatureCollection' as type,
    //                     array_to_json(array_agg(f)) as features
    //                 from
    //                     (
    //                         select
    //                             'Feature' as type,
    //                             ST_AsGeoJSON(temp.geom)::json as geometry,
    //                             row_to_json((temp)) as properties
    //                         from tl_scco_sig as temp
    //                         where temp.geom && st_makeenvelope(:minx, :miny, :maxx, :maxy)
    //                     ) as f
    //                 ) as fc`
    //             , {
    //                 replacements: {
    //                     minx,
    //                     miny,
    //                     maxx,
    //                     maxy
    //                 },
    //                 type: sequelize.QueryTypes.SELECT,
    //             });
    //
    //         return results[0];
    //     } catch (e) {
    //         logger.error(e.message);
    //         throw e;
    //     }
    // }

}