// CRUD: Simple Create, Read, Update, Delete api operations for data management

import { Router } from 'express';

const crudRouter = Router();

const models = require('require-all')({
	dirname: __dirname + '/../../models',
	filter: /^([^\.].*)\.(ts|js)$/
});

Object.keys(models).forEach((name) => {
	console.log(`REST routes added for ${name}`);
	const model = models[name].default;

	crudRouter.route('/' + name + 's')
		// C(reate)
		.post((req, res) => {
			let m = new model();
			Object.assign(m, req.body);
			m.save((err) => {
				if (err) {
					res.json({ error: err });
				} else {
					res.json(m);
				}
			});
		})
		// R(ead) all documents from model
		.get((req, res) => {
			model.find((err, ms) => {
				if (err) {
					res.json({ error: err });
				} else {
					res.json(ms);
				}
			});
		});

	crudRouter.route('/' + name + 's/:_id')
		// R(ead) a single document from model by matching ID
		.get((req, res) => {
			model.findById(req.params._id, (err, m) => {
				if (err) {
					res.json({ error: err });
				} else {
					res.json(m);
				}
			});
		})
		// U(pdate) a single document by id using req.body
		.put((req, res) => {
			model.findById(req.params._id, (err, m) => {
				if (err) {
					res.json({ error: err });
					return;
				}
				Object.assign(m, req.body);
				m.save((err) => {
					if (err) {
						res.json({ error: err });
					} else {
						res.json(m);
					}
				});
			});
		})
		// D(elete) a single document by id
		.delete((req, res) => {
			model.remove({
				_id: req.params._id
			}, (err) => {
				if (err) {
					res.json({ error: err });
				}
			});
		});

});

export default crudRouter;
