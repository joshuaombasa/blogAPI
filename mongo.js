const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


mongoose.connect("mongodb://127.0.0.1:27017/blogApp?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1")

console.log('connected to MongoDB')

const blogSchema = new mongoose.Schema({
    story: { type: String, required: true },
    author: { type: String, required: true },
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)


const newBlog = new Blog({
    story: "How AI is Transforming Healthcare",
    author: "John Doe",
})

newBlog.save()
    .then(response => {
        console.log(`blog saved successfully`)
    })
    .catch(error => console.log(error))