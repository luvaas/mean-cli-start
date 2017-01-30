import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as Q from 'q';
import log from './helpers/bunyan';
import config from './helpers/config';

const app: express.Express = express();

// Get environment
const env = require('get-env')();
log.info('Environment = ' + env);

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

// Set up mongoose to use promises via the Q library
(<any>mongoose).Promise = Q.Promise;

// Connect to MongoDB
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', log.error.bind(log, 'DB connection error:'));
db.once('open', () => {
	log.info('MongoDB connected');
});

// Handle errors
app.use((error: any, req, res, next) => {
	log.error(error);

	// Handle 404 as an error
	if (error.status === 404) {
		res.status(404).send({
			message: '404.  Not found.'
		});
	}
	else {
		// Handle everything else
		let showError = {
			message: error.message,
			error: {}
		};

		if (env === 'dev') {
			// Only include stacktrace when in dev
			showError.error = error;
		}

		res.status(error.statusCode || 500).json(error);
	}
});

export default app;

