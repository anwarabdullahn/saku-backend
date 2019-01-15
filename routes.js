const
    express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    privateRouter = passport.authenticate('jwt', { session: false }),
    AuthController = require('./controllers/AuthController'),
    WalletController = require('./controllers/WalletController'),
    CategoryController = require('./controllers/CategoryController'),
    TransactionController = require('./controllers/TransactionController')

router.get('/', (req, res) => res.json({
    success: true,
    msg: 'Nice Work~'
}))

router.post('/register', AuthController.Register)
router.post('/login', AuthController.Login)
router.post('/wallet', privateRouter, WalletController.Store)
router.get('/wallet', privateRouter, WalletController.Get)
router.put('/wallet', privateRouter, WalletController.Edit)
router.delete('/wallet', privateRouter, WalletController.Delete)
router.post('/category', privateRouter, CategoryController.Store)
router.get('/category', privateRouter, CategoryController.Get)
router.put('/category', privateRouter, CategoryController.Edit)
router.delete('/category', privateRouter, CategoryController.Delete)
router.post('/transaction', privateRouter, TransactionController.Store)
router.get('/transaction', privateRouter, TransactionController.Get)

module.exports = router