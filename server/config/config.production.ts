let prodConfig: any = require('./config.global');

prodConfig.debugmode = true;
prodConfig.hostname = 'localhost:3000';
prodConfig.world = 'world - prod';

module.exports = prodConfig;
