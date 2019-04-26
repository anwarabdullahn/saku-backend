const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
},
	{ timestamps: true });

module.exports = Category = mongoose.model('categories', CategorySchema);
