const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const express = require('express')

blogRouter.use(express.json())

blogRouter.get('/api/blogs', async (request, response) => {

  const blogs = await Blog.find({})
  response.status(200).json(blogs)  

})
  
blogRouter.post('/api/blogs', async (request, response) => {

  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  if (!blog.title || !blog.url) {
    response.status(400).end()
  } else {
    const blogs = await blog.save()
    response.status(201).json(blogs)
  }

})

blogRouter.delete('/api/blogs/:id', async (request, response) => {

  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

    if (deletedBlog) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
    
  } catch (error) {
    response.status(404).end()
  }
  
})

blogRouter.put('/api/blogs/:id', async (request, response) => {
  try {
    const body = request.body
    const blogs = await Blog.findOneAndUpdate(
      { _id: request.params.id },
      body,
      {new: true}
    )

    console.log(blogs);
    response.status(201).json(blogs)

  } catch (error) {
    console.log(error);
    response.status(404).end()
  }
})

module.exports = blogRouter