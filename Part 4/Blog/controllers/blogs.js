const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const userExtractor  = require('../utils/middleware').userExtractor
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})
blogsRouter.post('/',userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog
    .populate('user', { username: 1, name: 1 })
    .execPopulate()
  response.json(populatedBlog.toJSON())
})


blogsRouter.delete('/:id',userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (blog.user.toString() === user.id.toString())
  {
    await blog.deleteOne(blog)
    response.status(204).end()
  }
  else
  {
    return response.status(403).json({ error: 'only the user who created the blog is able to delete it' })
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter