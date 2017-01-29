import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as Q from 'q';
import log from './helpers/bunyan';

const app: express.Express = express();
const env = require('get-env')();
log.info('Environment = ' + env);

// Load config file
let config: any = require('./config/config.' + env);
app.set('config', config);

// View engine setup (This is only ever used for displaying error pages)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// TODO: Uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Create Express routes using all files in the routes directory
log.info('Create express routes...');
const routeModules = require('require-all')({
	dirname: __dirname + '/routes',
	filter: /^([^\.].*)\.(ts|js)$/,
	map: name => '/' + name
});
function resolve(root: string, modules): void {
	for (let name of Object.keys(modules)) {
		if (!name.startsWith('/')) {
			return;
		}
		const module = modules[name];
		if (module.default && module.default.route) {
			log.info(`Add router ${root + name}`);
			const router = module.default as express.Router;
			app.use(root, router);
		} else {
			resolve(root + name, module);
		}
	}
}
resolve('', routeModules);

// Default to main page. Angular route takes over from there.
app.use((req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err['status'] = 404;
	next(err);
});

// Error handlers

// Development error handler will print stacktrace
if (env === 'dev') {
	app.use((error: any, req, res, next) => {
		res.status(500).send({
			message: error.message,
			error
		});
	});
}

// Production error handler (no stacktraces leaked to user)
app.use((error: any, req, res, next) => {
	res.status(500).send({
		message: error.message,
		error: {}
	});
	return null;
});

// Set up mongoose to use promises via the Q library
(<any>mongoose).Promise = Q.Promise;

// Set up the API secret
app.set('superSecret', config.secret);

// Connect to MongoDB
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', log.error.bind(log, 'DB connection error:'));
db.once('open', () => {
	log.info('MongoDB connected');
});

export default app;

