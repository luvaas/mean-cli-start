import { Router } from 'express';
import log from '../../helpers/bunyan';
import Passwords from '../../helpers/passwords';

const authRouter = Router();

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
				return res.json(results);
			}
			else {
				results.info = 'User found successfully';
				results.success = true;
				user = user.toObject ? user.toObject() : user;

				Passwords.getToken(function(err: Error, token: string) {
					user.token = token; // TODO: Add a real token here
					results.user = user;
					return res.json(results);
				});
			}
		})
		.catch((err) => {
			let error = 'Error during find user. Err: ' + err;
			results.errors.push(error);
			results.info = error;
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
				log.info('Email already exists');

				results.info = 'Email address already in use.';
				results.success = false;
			}
			else {
				log.info('creating new user');
				let newUser = new Model();
				newUser.email = req.body.email;

				Passwords.hashPassword(req.body.password)
					.then((hash) => {
						newUser.password = hash;

						console.log('newUser:', newUser);

						newUser.save(function(err, savedUser) {
							if (err) {
								var error = 'Error during save new user. Err: ' + err;
								results.errors.push(error);
								results.info = 'Error creating new account.';
								results.success = false;

								return res.json(results);
							}
							else {
								log.debug('account saved');

								savedUser = savedUser.toObject ? savedUser.toObject() : savedUser;
								Passwords.getToken(function(err: Error, token: string) {
									savedUser.token = token; // TODO: Add a real token here
									results.user = user;
									results.user = savedUser;
									results.info = 'User created successfully';
									results.success = true;

									return res.json(results);
								});
							}
						});
					})
					.catch((err) => {
						var error = 'Error hashing password.  Err: ' + err;
						log.error(error);
						results.errors.push(error);
						results.info = 'Error creating new account.';
						results.success = false;

						return res.json(results);
					});
			}
		})
		.catch((err) => {
			let error = 'Error during find user. Err: ' + err;
					log.debug('account saved');

			results.errors.push(err);
			results.info = error;
			results.success = false;

			return res.json(results);
		});
});


export default authRouter;
