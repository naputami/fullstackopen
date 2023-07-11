const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {blogs: 0})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body


    if(body.title === undefined || body.url === undefined){
      response.status(400).end()
      return
    }

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    const savedBlog = await blog.save()
    savedBlog.populate('user', {blogs: 0})

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  
})

blogsRouter.delete('/:id', async (request, response) => {

  blogToDelete = await Blog.findById(request.params.id)

  if(!blogToDelete) {
    return response.status(401).json({ error: 'blog id is not found' })
  }

  if(blogToDelete.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'cannot delete blog by different username' })
  }

  await Blog.deleteOne(blogToDelete)
  response.status(202).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const changedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', {blogs: 0})
  response.json(changedBlog)
})

module.exports = blogsRouter