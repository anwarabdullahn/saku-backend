const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema

const WalletSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    balance: {
        type: Number,
        default: 0
    }
})

module.exports = Wallet = mongoose.model('wallets', WalletSchema)