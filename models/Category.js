const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = Category = mongoose.model('categories', CategorySchema)