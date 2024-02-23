const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.get('/:id', async (request, response, next) => {

    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }

})

blogRouter.post('/', async (request, response, next) => {

    const blog = new Blog({
        story: request.body.story,
        author: request.body.author,
    })

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.put('/:id', async (request,response, next) => {
    const { story, author } = request.body
    try {
        const updatedBlog = await Note.findByIdAndUpdate(request.params.id, { story, author }, { new: true, runValidators: true, context: 'query' })
        response.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter