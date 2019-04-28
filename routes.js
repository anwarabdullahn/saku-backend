const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	privateRouter = passport.authenticate('jwt', { session: false }),
	AuthController = require('./controllers/AuthController'),
	WalletController = require('./controllers/WalletController'),
	CategoryController = require('./controllers/CategoryController'),
	TransactionController = require('./controllers/TransactionController'),
	checkAuthorization = require('./middleware/authorized'),
	checkBalance = require('./middleware/checkBalance');

router
	.get('/', (req, res) => res.send('Hello World'))

	// Authentication Routes
	.post('/register', AuthController.Register)
	.post('/login', AuthController.Login)
	.get('/me', privateRouter, checkBalance, AuthController.Me)

	// Category Routes
	.post('/category', privateRouter, CategoryController.Store)
	.get('/category', privateRouter, checkAuthorization, CategoryController.Get)
	.put('/category', privateRouter, CategoryController.Edit)
	.delete('/category', privateRouter, CategoryController.Delete)

	// Wallet Routes
	.post('/wallet', privateRouter, WalletController.Store)
	.get('/wallet', privateRouter, WalletController.Get)
	.put('/wallet', privateRouter, WalletController.Edit)
	.delete('/wallet', privateRouter, WalletController.Delete)

	// Transaction Routes
	.post('/transaction', privateRouter, TransactionController.Store)
	.get('/transaction', privateRouter, TransactionController.Get)
	.put('/transaction', privateRouter, TransactionController.Edit)
	.delete('/transaction', privateRouter, TransactionController.Delete);

module.exports = router;
