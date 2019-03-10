const
    Validator = require('validator')
    
var
    errors = {}

const isEmpty = data =>
    data === undefined ||
    data === null ||
    (typeof data === 'object' && Object.keys(data).length === 0) ||
    (typeof data === 'string' && data.trim().length === 0)

module.exports.Register = (data) => {

    data.first_name = !isEmpty(data.first_name) ? data.first_name : ''
    data.last_name = !isEmpty(data.last_name) ? data.last_name : ''
    data.phone = !isEmpty(data.phone) ? data.phone : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.email = !isEmpty(data.email) ? data.email : ''

    if (!Validator.isEmail(data.email)) errors.email = `Must be correct email type`
    if (Validator.isEmpty(data.first_name)) errors.first_name = `First name is required`
    if (Validator.isEmpty(data.last_name)) errors.last_name = `Last name is required`
    if (Validator.isEmpty(data.password)) errors.password = `Password is required`
    if (Validator.isEmpty(data.phone)) errors.phone = `Phone is required`

    return {
        errors,
        isValid : isEmpty(errors)
    }
}

module.exports.Login = (data) => {

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (Validator.isEmpty(data.email)) errors.email = `Email is required`
    if (Validator.isEmpty(data.password)) errors.password = `Password is required`

    return {
        errors,
        isValid: isEmpty(errors)
    }
}