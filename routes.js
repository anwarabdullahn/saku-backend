const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	privateRouter = passport.authenticate('jwt', { session: false }),
	AuthController = require('./controllers/AuthController'),
	WalletController = require('./controllers/WalletController'),
	CategoryController = require('./controllers/CategoryController'),
	ThemeController = require('./controllers/ThemeController'),
	TransactionController = require('./controllers/TransactionController'),
	UserController = require('./controllers/UserController'),
	multer = require('./config/multerCloudinary'),
	checkAuthorization = require('./middleware/Authorized'),
	isAdmin = require('./middleware/isAdmin'),
	checkBalance = require('./middleware/checkBalance');

router
	.get('/', (req, res) => res.send('Hello World'))
	// Authentication Routes
	.post('/register', AuthController.Register)
	.post('/login', AuthController.Login)
	.post('/admin/register', AuthController.AdminRegister)
	.post('/admin/login', AuthController.AdminLogin)
	.get('/me', privateRouter, checkBalance, AuthController.Me)
	.put('/', privateRouter, multer.single('avatar'), UserController.UpdateUser)
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
	.delete('/transaction', privateRouter, TransactionController.Delete)
	// Theme Routes
	.post('/theme', privateRouter, isAdmin, multer.single('image'), ThemeController.Store)
	.get('/theme', ThemeController.Get)
	.put('/theme', privateRouter, isAdmin, multer.single('image'), ThemeController.Edit)
	.delete('/theme', privateRouter, isAdmin, multer.single('image'), ThemeController.Delete);

module.exports = router;
