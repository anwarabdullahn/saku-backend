const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
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
			type: String
		},
		pin: {
			type: Number
		},
		avatar: {
			type: String
		},
		balance: {
			type: Number,
			required: true,
			default: 0
		},
		deletedAt: {
			type: Date,
			default: null
		}
	},
	{ timestamps: true }
);

module.exports = User = mongoose.model('users', UserSchema);
