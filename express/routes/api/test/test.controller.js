const Response = require('../../../middlewares/Response');

module.exports = {
    async getTests(req, res) {
        const { searchText } = req.query;
        res.json(Response.getSuccessResult({ searchText }));
    },
    async postTest(req, res) {
        const body = req.body;
        res.json(Response.getSuccessResult({ body }));
    },
    async getTest(req, res) {
        const { id } = req.params;
        res.json(Response.getSuccessResult({ id }));
    },
    async patchTest(req, res) {
        const { id } = req.params;
        const body = req.body;
        res.json(Response.getSuccessResult({ id, body }));
    },
    async putTest(req, res) {
        const { id } = req.params;
        const body = req.body;
        res.json(Response.getSuccessResult({ id, body }));
    },
    async deleteTest(req, res) {
        const { id } = req.params;
        res.json(Response.getSuccessResult({ id }));
    },
};