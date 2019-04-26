const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

module.exports = User = mongoose.model('users', UserSchema);