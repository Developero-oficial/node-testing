require('dotenv').config();
const logger = require('pino')();

const app = require('./src/app');
const {port} = require('./src/config');

app.listen(port, () => logger.info(`app on port: ${port}`));
