const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	privateRouter = passport.authenticate('jwt', { session: false }),
	AuthController = require('./controllers/AuthController'),
	WalletController = require('./controllers/WalletController'),
	CategoryController = require('./controllers/CategoryController'),
	TransactionController = require('./controllers/TransactionController'),
	checkAuthorized = require('./middleware/Authorized');

router
	.get('/', (req, res) => res.send('Hello World'))
	.post('/register', AuthController.Register)
	.post('/login', AuthController.Login)
	.post('/category', privateRouter, CategoryController.Store)
	.get('/category', privateRouter, checkAuthorized, CategoryController.Get)
	.put('/category', privateRouter, CategoryController.Edit)
	.delete('/category', privateRouter, CategoryController.Delete)
	.post('/wallet', privateRouter, WalletController.Store)
	.get('/wallet', privateRouter, WalletController.Get)
	.put('/wallet', privateRouter, WalletController.Edit)
	.delete('/wallet', privateRouter, WalletController.Delete)
	.post('/transaction', privateRouter, TransactionController.Store)
	.get('/transaction', privateRouter, TransactionController.Get)
	.put('/transaction', privateRouter, TransactionController.Edit)
	.delete('/transaction', privateRouter, TransactionController.Delete);

module.exports = router;
