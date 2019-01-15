const
    Transaction = require('../models/Transaction'),
    Wallet = require('../models/Wallet')

module.exports.Store = (req, res) => {
    const
        { wallet_id, category_id, type, desc, amount } = req.body,
        newTransaction = new Transaction({ wallet_id, category_id, type, desc, amount})

    Wallet.findById(wallet_id).then((wallet, err) => {
        if (err) res.json(err)
        if(wallet){
            if (type == 'Plus') {
                wallet.balance = parseInt(wallet.balance) + parseInt(amount)
            } else {
                wallet.balance = parseInt(wallet.balance) - parseInt(amount)
            }
            wallet.save().then(()=> {
                newTransaction.save().then((transaction, err) => {
                    if (err) res.json(err)
                    res.status(201).json({
                        success: true,
                        msg: `Successfully create Transaction`,
                        result: transaction
                    })
                })
            })
        } else {
            res.status(400).json({
                success: false,
                msg: `Failed to create Transaction`,
            })
        }
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