const
    Category = require('../models/Category'),
    Validation = require('../config/validation')

module.exports.Store = (req, res) => {
    const
        {name} = req.body,
        newCategory = new Category({name, user_id: req.user.id}),
        { errors, isValid } = Validation.StoreNameOnly(req.body)

        !isValid ? res.status(400).json({
            success: false,
            msg: `Error Validation`,
            errors
        }) : newCategory.save().then((category, err) => {
        err && res.json(err)
        category ? res.status(201).json({
            success: true,
            msg: `Category created`,
            result: category
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

    _id ? Category.findOne({user_id, _id}).then((category, err) => {
        err && res.json(err)
        category ? res.status(200).json({
            success: true,
            msg: `Find Category by id`,
            result: category
        }) :
        res.status(400).json({
            success: false,
            msg: `Failed to find Category`
        })
    }) : Category.find().then((category, err) => {
        err && res.json(err)
        category ? res.status(200).json({
            success: true,
            msg: `Find Category`,
            result: category
        }) :
        res.status(400).json({
            success: false,
            msg: `Failed to find Category`
        })
    })
}


module.exports.Delete = (req, res) => {
    const
        user_id = req.user.id,
        _id = req.query.id

    Category.findOne({user_id, _id}).then((category, err) => {
        err && res.json(err)
        category ? category.delete().then(() => res.status(200).json({
            success: true,
            msg: `Successfully delete category`,
        })) :
        res.status(400).json({
            success: false,
            msg: `Failed to find category`
        })
    })
}

module.exports.Edit = (req, res) => {
    const
        user_id = req.user.id,
        _id = req.query.id,
        { name } = req.body,
        toBeCategory = {}

    if (name) toBeCategory.name = name

    Category.findOneAndUpdate(
        { user_id, _id },
        { $set: toBeCategory },
        { new: true })
        .then((category, err) => {
        err && res.json(err)
        category ? res.status(200).json({
            success: true,
            msg: `Successfully update user category`,
            result: category
        }): res.status(400).json({
            success: false,
            msg: `Failed to update category`
        })
    })
}