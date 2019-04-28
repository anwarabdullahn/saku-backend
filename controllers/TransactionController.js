const
    Transaction = require('../models/Transaction'),
    Wallet = require('../models/Wallet'),
    Validation = require('../config/validation')

module.exports.Store = (req, res) => {
    const
        { walletId, categoryId, type, desc, amount, date } = req.body,
        newTransaction = new Transaction({ walletId, categoryId, type, desc, amount}),
        { errors, isValid } = Validation.StoreTransaction(req.body)

    !isValid ? res.status(400).json({
        success: false,
        msg: `Error Validation`,
        errors
    }) : Wallet.findById(walletId).then((wallet, err) => {
        err && res.json(err)
        if (wallet) {
            if (type == 'Plus') wallet.balance = parseInt(wallet.balance) + parseInt(amount)
            else wallet.balance = parseInt(wallet.balance) - parseInt(amount)

            wallet.save().then(()=> {
                date ? newTransaction.date = new Date(date) : newTransaction.date = new Date()
                newTransaction.save().then((transaction, err) => {
                    err && res.json(err)
                    res.status(201).json({
                        success: true,
                        msg: `Successfully create Transaction`,
                        result: transaction
                    })
                })
            })
        } else res.status(400).json({
                    success: false,
                    msg: `Failed to create Transaction`,
                })
    })
}

module.exports.Get = (req, res) => {
    const
        walletId = req.query.walletId

    walletId ? Transaction.find({walletId}).sort({date: 'desc'}).then((transaction, err) => {
        err && res.json(err)
        transaction ? res.status(200).json({
            success: true,
            msg: `Find Transaction by id`,
            result: transaction
        }) : res.status(400).json({
            success: false,
            msg: `Failed to find Transaction`
        })
    }): Transaction.find()
            // .select(['desc', '_id'])
            .populate('walletId', ['name'])
            .sort({date: 'desc'})
            .then((transaction, err) => {
        err && res.json(err)
        transaction ? res.status(200).json({
            success: true,
            msg: `Find Transaction`,
            result: transaction
        }) : res.status(400).json({
            success: false,
            msg: `Failed to find Transaction`
        })
    })
}

module.exports.Edit = (req, res) => {
    const
        {walletId, id} = req.query,
        {categoryId, type, desc, date, amount} = req.body,
        toBeTransaction = {}

    if (categoryId) toBeTransaction.categoryId = categoryId
    if (type) toBeTransaction.type = type
    if (desc) toBeTransaction.desc = desc
    if (date) toBeTransaction.date = new Date(date)
    if (amount) toBeTransaction.amount = amount

    Wallet.findById(walletId).then((wallet, err) => {
        if(err) res.json(err)
        wallet ? Transaction.findOne({walletId, _id:id}).then((transaction, err) => {
            if(!transaction){
                return res.status(400).json({
                    success: false,
                    msg: `Failed to find Transaction`
                })
            }
            var
                balance = wallet.balance,
                trbalance = transaction.amount

            if (transaction.type == 'Plus') balance = parseInt(balance) - parseInt(trbalance)
            else if (transaction.type == 'Minus') balance = parseInt(balance) + parseInt(trbalance)

            wallet.balance = balance

            if (toBeTransaction.type == 'Plus') wallet.balance = parseInt(wallet.balance) + parseInt(toBeTransaction.amount)
            else if (toBeTransaction.type == 'Minus') wallet.balance = parseInt(wallet.balance) - parseInt(toBeTransaction.amount)

            wallet.save().then(() => {
                Transaction.findOneAndUpdate(
                    {walletId, _id:id},
                    {$set: toBeTransaction},
                    {new: true}
                ).then((transaction, err) => {
                    err && res.json(err)
                    res.status(200).json({
                        success: true,
                        msg: `Successfully edit transaction`,
                        result: transaction
                    })
                })

            })
        }): res.status(400).json({
            success: false,
            msg: `Failed to find Transaction`
        })
    })
}


module.exports.Delete = (req, res) => {
    const
        {walletId, id} = req.query

    Wallet.findById(walletId).then((wallet, err) => {
        if(err) res.json(err)
        wallet ? Transaction.findOne({walletId, _id:id}).then((transaction, err) => {
            if(!transaction){
                return res.status(400).json({
                    success: false,
                    msg: `Failed to find Transaction`
                })
            }
            var
                balance = wallet.balance,
                trbalance = transaction.amount

            if (transaction.type == 'Plus') balance = parseInt(balance) - parseInt(trbalance)
            else if (transaction.type == 'Minus') balance = parseInt(balance) + parseInt(trbalance)

            wallet.balance = balance

            wallet.save().then(() => {
                Transaction.findOneAndRemove(
                    {walletId, _id:id}
                ).then(() => {
                    res.status(200).json({
                        success: true,
                        msg: `Successfully delete transaction`,
                    })
                })

            })
        }): res.status(400).json({
            success: false,
            msg: `Failed to find Transaction`
        })
    })
}