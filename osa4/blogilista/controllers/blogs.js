const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// haetaan kaikki blogit async/await-syntaksilla
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// lisätään uusi blogi async/await-syntaksilla
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter