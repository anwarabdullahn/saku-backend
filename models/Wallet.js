const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const WalletSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	themeId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	balance: {
		type: Number,
		default: 0
	}
});

module.exports = Wallet = mongoose.model('wallets', WalletSchema);
