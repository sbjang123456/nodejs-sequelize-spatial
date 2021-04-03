const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const { sequelize } = require('../sequelize');
const { colorize } = require('../utils/console');
const log4js = require('log4js');
const logger = log4js.getLogger('initialize');
const os = require('os');

const log4jsConfigure = () => {
    log4js.configure(path.join(__dirname, '..', 'config', 'log4js.json'));
};

const commConfig = yaml.load(
    fs.readFileSync(path.join(__dirname, "..", "config", "config.yaml"), 'utf8')
);
const config = commConfig[process.env.NODE_ENV || "development"];

const assertDatabaseConnectionOK = async () => {
    logger.info(`Checking database connection...`);
    try {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: false });
            logger.info(colorize('✓ DB connection success.', 'blue'));
            logger.info('  Press CTRL-C to stop\n');
        } catch (e) {
            logger.error(colorize('✗ DB connection error. Please make sure DB is running.', 'red'));
            logger.error(err.message);
            process.exit();
        }
        logger.info(colorize('Database connection OK!', 'blue'));
    } catch (err) {
        logger.error(colorize('Unable to connect to the database:', 'red'));
        logger.error(err.message);
        process.exit(1);
    }
};

const initialize = async () => {
    log4jsConfigure();
    await assertDatabaseConnectionOK();
};

module.exports = {
    initialize,
    config,
}