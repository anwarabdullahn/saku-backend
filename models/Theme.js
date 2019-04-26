const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const ThemeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

module.exports = Theme = mongoose.model('themes', ThemeSchema);
