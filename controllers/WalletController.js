const
    Wallet = require('../models/Wallet'),
    Transaction = require('../models/Transaction')


module.exports.Store = (req, res) => {
    const
        { name, balance } = req.body,
        newWallet = new Wallet({ name, balance, user_id: req.user.id})

        newWallet.save()
            .then( (wallet, err) => {
                if (err) res.json(err)
                wallet ? res.status(201).json({
                    success: true,
                    msg:`Wallet created`,
                    result: wallet
                }) :
                res.status(400).json({
                    success: false,
                    msg: `Failed to create Wallet`,
                })
        })
}

module.exports.Get = (req, res) => {
    const
        user_id = req.user.id,
        _id = req.query.id

    _id ? Wallet.findOne({user_id, _id}).then((wallet, err) => {
        if (err) res.json(err)
        wallet ? res.status(200).json({
            success: true,
            msg: `Successfully find user wallet`,
            result: wallet
        }) :
        res.status(400).json({
            success: false,
            msg: `Failed to find wallet`
        })
    }) : Wallet.find({user_id}).then((wallet, err) => {
        if (err) res.json(err)
        wallet ? res.status(200).json({
            success: true,
            msg: `Successfully find user wallet`,
            result: wallet
        }) :
        res.status(400).json({
            success: false,
            msg: `Failed to find wallet`
        })
    })
}

module.exports.Delete = (req, res) => {
    const
        user_id = req.user.id,
        _id = req.query.id

    Wallet.findOne({user_id, _id}).then((wallet, err) => {
        if (err) res.json(err)
        wallet ?
            Transaction.find({wallet_id: _id}).then((transaction, err) => {
                if (err) res.json(err)
                else (transaction.delete())
                wallet.delete().then(() => res.status(200).json({
                    success: true,
                    msg: `Successfully delete user wallet`,
                }))
            })
        :
        res.status(400).json({
            success: false,
            msg: `Failed to find wallet`
        })
    })
}

module.exports.Edit = (req, res) => {
    const
        user_id = req.user.id,
        _id = req.query.id,
        {name} = req.body,
        toBeWallet = {}

    if (name) toBeWallet.name = name

    Wallet.findOneAndUpdate(
        { user_id, _id },
        { $set: toBeWallet },
        { new: true })
        .then((wallet, err) => {
        if (err) res.json(err)
        res.status(200).json({
            success: true,
            msg: `Successfully update user wallet`,
            result: wallet
        })
    })
}