// Set up Bunyan for logging
import * as bunyan from 'bunyan';
import * as path from 'path';

const env = require('get-env')();

let bunyanDebugStream: any = require('bunyan-debug-stream');
let logStreams: any = [
	{
		level: (env === 'dev') ? 'info' : 'warn', // log INFO and above on dev and WARN and above on prod
		type:   'raw',
		stream: bunyanDebugStream({
			// Output to the console should be pretty-printed for human consumption
			basepath: __dirname,
			forceColor: true
		})
	}
];
if (env === 'prod') {
	// When on production, add an additional stream to log WARN level and above to a file (in default JSON format)
	logStreams.push(
		{
			level: 'warn',
			path: 'logs/api-server-error.log' // log WARN and above to a file
		}
	);
}
let log = bunyan.createLogger({
	name: 'logger',
	streams: logStreams,
	serializers: bunyanDebugStream.serializers
});

export default log;
