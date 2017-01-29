var config: any = require('./config.global');

config.db = 'mongodb://localhost/api-server';
config.secret = 'myDevSecret';

module.exports = config;
