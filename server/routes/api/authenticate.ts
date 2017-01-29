import { Router } from 'express';
import log from '../../helpers/bunyan';
import Passwords from '../../helpers/passwords';

const authRouter = Router();

authRouter.route('/authenticate').post((req, res) => {

	let Model = require('../../models/user').default;

	let results: any = {
		info 	: '',
		user 	: {},
		success : false
	};

	Model.findOne({email: req.body.email}).exec()
		.then((user) => {
			if (!user || !user.password) {
				throw 'No user found with matching criteria.';
			}
			else {
				return Passwords.comparePassword(req.body.password, user.password)
					.then(function(matches) {
						if (matches) {
							// Password matches bcrypt hash
							user = user.toObject ? user.toObject() : user;

							// TODO: make this a promise
							Passwords.getToken(function(err: Error, token: string) {
								// Success!
								user.token = token;
								delete user.password; // Remove the password property before it gets sent back to the client
								results.user = user;
								results.info = 'Successfully found user.';
								results.success = true;

								return res.json(results);
							});
						}
						else {
							throw 'Passwords don\'t match';
						}
					});
			}
		})
		.catch((err) => {
			results.info = 'Invalid username or password.';
			results.success = false;

			return res.json(results);
		});
});

authRouter.route('/register').post((req, res) => {

	log.info('Hit register route. req.body:', req.body);

	let Model = require('../../models/user').default;

	let results: any = {
		errors 	: [],
		info 	: '',
		user 	: {},
		success : false
	};

	// TODO: Make sure the email address is a valid one

	Model.findOne({email: req.body.email}).exec()
		.then((user) => {
			if (user) {
				throw 'Email address already in use.';
			}
			else {
				let newUser = new Model();
				newUser.email = req.body.email;

				return Passwords.hashPassword(req.body.password, 10)
					.then((hash) => {
						newUser.password = hash;

						return newUser.save()
							.then((savedUser) => {
								if (!savedUser) {
									throw 'Could not save new user.';
								}
								else {
									savedUser = savedUser.toObject ? savedUser.toObject() : savedUser;

									// TODO: make this a promise
									Passwords.getToken(function(err: Error, token: string) {
										// Success!

										savedUser.token = token;
										delete user.password; // Remove the password property before it gets sent back to the client
										results.user = savedUser;
										results.info = 'User created successfully';
										results.success = true;

										return res.json(results);
									});
								}
							});
					});
			}
		})
		.catch((err) => {
			results.info = 'Could not create new user. ' + err;
			results.success = false;

			return res.json(results);
		});
});


export default authRouter;
