const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const WalletSchema = new Schema(
	{
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
			ref: 'themes'
		},
		balance: {
			type: Number,
			default: 0
		},
		deletedAt: {
			type: Date,
			default: null
		}
	},
	{ timestamps: true }
);

module.exports = Wallet = mongoose.model('wallets', WalletSchema);
