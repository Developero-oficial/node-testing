require('dotenv').config();
const logger = require('pino')();
const app = require('./src/app');

const port = process.env.APP_PORT;

app.listen(port, () => logger.info(`app on port: ${port}`));
