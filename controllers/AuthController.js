const
    User = require('../models/User'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    secret = process.env.SECRET,
    Validation = require('../config/validation')

module.exports.Register = (req, res) => {
    const
        { first_name, last_name, email, password, phone } = req.body,
        newUser = new User({ first_name, last_name, email: (email).trim(), phone }),
        { errors, isValid } = Validation.Register(req.body)

    !isValid ? res.status(400).json({
        success: false,
        msg: `Error Validation`,
        errors
    }) : User.findOne({ email })
        .then(user => {
        user ? res.status(400).json({
            success: false,
            msg: `Email already exist`
        }) : bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    newUser.password = hash
                    newUser.save().then(() => {
                        res.status(201).json({
                            success: true,
                            msg: `Register Success`
                        })
                    })
                })
            })
    })
}

module.exports.Login = (req, res) => {
    const
        { email, password } = req.body,
        { errors, isValid } = Validation.Login(req.body)

    !isValid ? res.status(400).json({
        success: false,
        msg: `Error Validation`,
        errors
    }) : User.findOne({ email })
        .then(user => {
        !user ? res.status(404).json({
            success: false,
            msg: `User not found`
        }) :
        bcrypt.compare(password, user.password).then(match => {
            const payload = { id: user.id, email}
            !match ? res.status(400).json({
                success:false,
                msg: `Inccorect Password`
            }) : jwt.sign( payload, secret, (err, token) =>
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                )
            })
    })
}