let devConfig: any = require('./config.global');

devConfig.debugmode = true;
devConfig.hostname = 'localhost:3000';
devConfig.world = 'world - dev';

module.exports = devConfig;
