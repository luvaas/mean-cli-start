// CRUD: Simple Create, Read, Update, Delete api operations for data management.

import { Router } from 'express';
import log from '../../helpers/bunyan';
import { Results } from '../../models/results';

let modelName = 'user'; // This needs to exactly match the corresponding file name under /server/models/, minus the extension
let modelPath = __dirname + '/../../models/';
let model = require(modelPath + modelName).default;
const crudRouter = Router();

log.info(`Creating CRUD routes for ${modelName}`);

// Create routes for plural object fetching
crudRouter.route('/' + modelName + 's')
	// C(reate)
	.post((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if current user doesn't have sufficient permission

		let results: Results = {};
		let m = new model();

		Object.assign(m, req.body);

		return m.save()
			.then((saved_m) => {
				if (!saved_m) {
					throw 'Could not save new user.';
				}
				else {
					saved_m = saved_m.toObject ? saved_m.toObject() : saved_m;
					delete saved_m.password; // Remove the password property before it is sent to the client

					// Success!
					results.data = saved_m;
					results.info = 'User created successfully';
					results.success = true;

					return res.json(results);
				}
			})
			.catch((err) => {
				results.info = 'Could not create new user.';
				results.success = false;

				return res.json(results);
			});
	})

	// R(ead) all documents from model
	.get((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if current user doesn't have sufficient permission

		let results: Results = {};
		let fields = '-password'; // Don't return passwords

		model.find({}, fields).exec()
			.then((ms) => {
				if (!ms || !ms.length) {
					throw 'No users found.';
				}
				else {
					results.info = 'Found users successfully.';
					results.success = true;
					results.data = ms;
					return res.json(results);
				}
			})
			.catch((err) => {
				results.info = err;
				results.success = false;

				return res.json(results);
			});
	});

// Create routes for singular model fetching (i.e., for a specific object with a given ID)
crudRouter.route('/' + modelName + 's/:id')
	// R(ead) a single document from model by matching ID
	.get((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if current user doesn't have sufficient permission

		let fields = '-password'; // Don't return passwords
		let results: Results = {};

		model.findById(req.params.id, fields).exec()
			.then((m) => {
				if (!m) {
					throw 'No user found.';
				}
				else {
					results.info = 'Found user successfully.';
					results.success = true;
					results.data = m;
					return res.json(results);
				}
			})
			.catch((err) => {
				results.info = err;
				results.success = false;

				return res.json(results);
			});
	})

	// U(pdate) a single document by id using req.body
	.put((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if current user doesn't have sufficient permission

		let fields = '-password'; // Don't return passwords
		let results: Results = {};

		model.findById(req.body._id, fields).exec()
			.then((m) => {
				if (!m) {
					throw 'No user found.';
				}
				else {
					Object.assign(m, req.body);
					m.modified = new Date();

					return m.save()
						.then((saved_m) => {
							if (!saved_m) {
								throw 'Could not save updated user.';
							}
							else {
								saved_m = saved_m.toObject ? saved_m.toObject() : saved_m;
								delete saved_m.password; // Remove the password property before it is sent to the client

								// Success!
								results.data = saved_m;
								results.info = 'Updated user successfully.';
								results.success = true;

								return res.json(results);
							}
						})
						.catch((err) => {
							results.info = err;
							results.success = false;

							return res.json(results);
						});
				}
			})
			.catch((err) => {
				results.info = err;
				results.success = false;

				return res.json(results);
			});
	})

	// D(elete) a single document by id
	.delete((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if current user doesn't have sufficient permission

		let results: Results = {};

		model.remove({_id: req.params.id}).exec()
			.then((m) => {
				results.info = 'Deleted user successfully.';
				results.success = true;
				return res.json(results);
			})
			.catch((err) => {
				results.info = err;
				results.success = false;

				return res.json(results);
			});
	});

export default crudRouter;
