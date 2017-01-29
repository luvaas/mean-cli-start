import { Router } from 'express';

const authRouter = Router();

// const env = app.get('env');
// const config = require('./config/config.' + env);
// app.set('config', config);
// console.log('config:', config);

authRouter.route('/authenticate').post((req, res) => {

	let Model = require('../../models/user').default;

	let results: any = {
		errors 	: [],
		info 	: '',
		user 	: {},
		success : false
	};

	Model.findOne({email: req.body.email, password: req.body.password}).exec()
		.then((user) => {
			if (!user) {
				results.info = 'No user found with matching criteria.';
				results.success = false;
			}
			else {
				results.info = 'User found successfully';
				results.success = true;
				user = user.toObject ? user.toObject() : user;
				user.token = 'hello world'; // TODO: Add a real token here
				results.user = user;

			}

			return res.json(results);
		})
		.catch((err) => {
			let error = 'Error during find user. Err: ' + err;
			results.errors.push(err);
			results.info = error;
			results.success = false;

			return res.json(results);
		});
});

export default authRouter;
