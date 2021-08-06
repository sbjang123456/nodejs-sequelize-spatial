'use strict';

/* tlSccoSig.model.js */
module.exports = (database, dataType) => {
    const tlSccoSig = database.define('tlSccoSig', {
        id: {field: 'id', type: dataType.INTEGER, primaryKey: true, autoIncrement: true},
        geom: {field: 'geom', type: dataType.GEOMETRY},
        sig_cd: {field: 'sig_cd', type: dataType.STRING(5), allowNull: true},
        sig_eng_nm: {field: 'sig_eng_nm', type: dataType.STRING(40), allowNull: true},
        sig_kor_nm: {field: 'sig_kor_nm', type: dataType.STRING(40), allowNull: true},
        createdAt: {field: "created_at", type: dataType.DATE},
        updatedAt: {field: "updated_at", type: dataType.DATE},
    }, {
        classMethod: {},
        tableName: 'tl_scco_sig',
        underscore: true, //카멜케이스
        timestamps: true, //createAt, updateAt 컬럼 추가 여부
    })

    return tlSccoSig;
}