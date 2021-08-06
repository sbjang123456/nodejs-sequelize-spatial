'use strict';

/* tlSccoCtprvn.model.js */
module.exports = (database, dataType) => {
    const tlSccoCtprvn = database.define('tlSccoCtprvn', {
        id: {field: 'id', type: dataType.INTEGER, primaryKey: true, autoIncrement: true},
        geom: {field: 'geom', type: dataType.GEOMETRY},
        ctprvn_cd: {field: 'ctprvn_cd', type: dataType.STRING(2), allowNull: true},
        ctp_eng_nm: {field: 'ctp_eng_nm', type: dataType.STRING(40), allowNull: true},
        ctp_kor_nm: {field: 'ctp_kor_nm', type: dataType.STRING(40), allowNull: true},
        createdAt: {field: "created_at", type: dataType.DATE},
        updatedAt: {field: "updated_at", type: dataType.DATE},
    }, {
        classMethod: {},
        tableName: 'tl_scco_ctprvn',
        underscore: true, //카멜케이스
        timestamps: true, //createAt, updateAt 컬럼 추가 여부
    });

    return tlSccoCtprvn;
}