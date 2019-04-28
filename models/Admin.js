const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const AdminSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = Admin = mongoose.model('admins', AdminSchema);
