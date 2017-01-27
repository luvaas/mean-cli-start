import { Router } from 'express';

const authRouter = Router();

// router.route('/authenticate')
// 	.post((req, res) => {
// 		console.log('hit authentication route');
// 		console.log('req:', req););
// 		res.json({ test: 'hello' });
// 	})

authRouter.route('/authenticate').post((req, res) => {
	console.log('hit authentication route');
	console.log('req.body:', req.body);

	var user:any = {
		name : 'Darren',
		email: 'darren@luvaas.com',
		token: 'test'
	}

	var results:any = {
		user : user
	};

	res.json(results);
})

export default authRouter;
