import log from '../helpers/bunyan';

const env = require('get-env')();
let configName = 'config.' + env;
let Config: any = require('../config/' + configName);

log.info('Using config file: ' + configName);

export default Config;
