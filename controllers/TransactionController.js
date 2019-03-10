const
    Transaction = require('../models/Transaction'),
    Wallet = require('../models/Wallet'),
    Validation = require('../config/validation')

module.exports.Store = (req, res) => {
    const
        { wallet_id, category_id, type, desc, amount, date } = req.body,
        newTransaction = new Transaction({ wallet_id, category_id, type, desc, amount}),
        { errors, isValid } = Validation.StoreTransaction(req.body)
    console.log(amount)
        if (!isValid) return res.status(400).json({
            success: false,
            msg: `Error Validation`,
            errors
        })

    Wallet.findById(wallet_id).then((wallet, err) => {
        if (err) res.json(err)
        if (wallet) {
            if (type == 'Plus') wallet.balance = parseInt(wallet.balance) + parseInt(amount)
            else wallet.balance = parseInt(wallet.balance) - parseInt(amount)

            wallet.save().then(()=> {
                date ? newTransaction.date = new Date(date) : newTransaction.date = new Date()
                newTransaction.save().then((transaction, err) => {
                    if (err) res.json(err)
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
        wallet_id = req.query.wallet_id

    wallet_id ? Transaction.find({wallet_id}).sort({date: 'desc'}).then((transaction, err) => {
        if (err) res.json(err)
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
            .populate('wallet_id', ['name'])
            .sort({date: 'desc'})
            .then((transaction, err) => {
        if (err) res.json(err)
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
        {wallet_id, id} = req.query,
        {category_id, type, desc, date, amount} = req.body,
        toBeTransaction = {}

    if (category_id) toBeTransaction.category_id = category_id
    if (type) toBeTransaction.type = type
    if (desc) toBeTransaction.desc = desc
    if (date) toBeTransaction.date = new Date(date)
    if (amount) toBeTransaction.amount = amount

    Wallet.findById(wallet_id).then((wallet, err) => {
        if(err) res.json(err)
        wallet ? Transaction.findOne({wallet_id, _id:id}).then((transaction, err) => {
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
                    {wallet_id, _id:id},
                    {$set: toBeTransaction},
                    {new: true}
                ).then((transaction, err) => {
                    if (err) res.json(err)
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
        {wallet_id, id} = req.query

    Wallet.findById(wallet_id).then((wallet, err) => {
        if(err) res.json(err)
        wallet ? Transaction.findOne({wallet_id, _id:id}).then((transaction, err) => {
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
                    {wallet_id, _id:id}
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