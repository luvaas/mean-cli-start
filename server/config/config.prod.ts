var config: any = require('./config.global');

config.db = 'mongodb://localhost/api-server';
config.secret = 'myProdSecret';

module.exports = config;
