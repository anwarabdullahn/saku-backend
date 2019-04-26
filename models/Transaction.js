const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	walletId: {
		type: Schema.Types.ObjectId,
		ref: 'wallets'
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: 'categories'
	},
	type: {
		type: String,
		enum: [ 'Plus', 'Minus' ],
		default: 'Plus'
	},
	desc: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	amount: {
		type: Number,
		required: true
	}
});

module.exports = Transaction = mongoose.model('transactions', TransactionSchema);
