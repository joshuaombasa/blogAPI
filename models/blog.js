const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    story: {type: String, minLength: 5, required: true},
    author: {type: String, required: true}
})

blogSchema.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)