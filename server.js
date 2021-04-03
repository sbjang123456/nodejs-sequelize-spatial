const app = require('./express/app');
const http = require('http');
const logger = require("log4js").getLogger('server');
const { colorize } = require('./utils/console');
const { initialize, config } = require('./initialize');

const PORT = config.comm.nodePort || 8080;

(async () => {
    await initialize();

    const httpServer = http.createServer(app);
    httpServer.listen(PORT, (err) => {
        if (err) {
            logger.error(colorize(`Express Server has failed on port: ${PORT}`, 'red'));
            throw err;
        }
        logger.info(colorize(`Express server has started on port ${PORT}`, 'green'));

        if (process.send) {
            process.send('ready');
        }
    });
})();

