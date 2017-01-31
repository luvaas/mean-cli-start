// CRUD: Simple Create, Read, Update, Delete api operations for data management.

import { Router } from 'express';
import log from '../../helpers/bunyan';

let modelName = 'user'; // This needs to exactly match the corresponding file name under /server/models/, minus the extension
let modelPath = __dirname + '/../../models/';
let model = require(modelPath + modelName).default;
const crudRouter = Router();

log.info(`Creating CRUD routes for ${modelName}`);

// Create routes for plural object fetching
crudRouter.route('/' + modelName + 's')
	// C(reate)
	.post((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if user doesn't have sufficient permission

		let m = new model();
		Object.assign(m, req.body);
		m.save((err) => {
			if (err) {
				res.json({ error: err });
			}
			else {
				res.json(m);
			}
		});
	})
	// R(ead) all documents from model
	.get((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if user doesn't have sufficient permission

		let fields = '-password'; // Don't return passwords
		model.find({}, fields, (err, ms) => {
			if (err) {
				res.json({ error: err });
			}
			else {
				res.json(ms);
			}
		});
	});

// Create routes for singular model fetching (i.e., for a specific object with a given ID)
crudRouter.route('/' + modelName + 's/:_id')
	// R(ead) a single document from model by matching ID
	.get((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if user doesn't have sufficient permission

		let fields = '-password'; // Don't return passwords
		model.findById(req.params._id, fields, (err, m) => {
			if (err) {
				res.json({ error: err });
			}
			else {
				res.json(m);
			}
		});
	})
	// U(pdate) a single document by id using req.body
	.put((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if user doesn't have sufficient permission

		model.findById(req.params._id, (err, m) => {
			if (err) {
				res.json({ error: err });
				return;
			}
			Object.assign(m, req.body);
			m.save((err) => {
				if (err) {
					res.json({ error: err });
				}
				else {
					res.json(m);
				}
			});
		});
	})
	// D(elete) a single document by id
	.delete((req: any, res: any, next: any) => {
		if (!req.user || !req.user.admin) { return next({status: 401}); } // Throw error if user doesn't have sufficient permission

		model.remove({
			_id: req.params._id
		}, (err) => {
			if (err) {
				res.json({ error: err });
			}
		});
	});

export default crudRouter;
