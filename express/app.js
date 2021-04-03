const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

const app = express();
require('../docs/swagger')(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
    next();
});

app.use(routes);

app.use((req, res, next) => {
    res.status(404).send();
    next(Error('not found'));
});

app.use((err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        result: false,
        error: err.message || 'internal server error',
    });
});

module.exports = app;
