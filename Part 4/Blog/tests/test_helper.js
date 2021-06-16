const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How to master Javascript',
    author: 'Kent C Dodds',
    url: 'www.javascriptmaster.com/masteringjavascript',
    likes: 4
  },
  {
    title: 'Writing Javascript for beginners',
    author: 'Kent C Dodds',
    url: 'www.javascriptmaster.com/javascriptforbeginners',
    likes: 7
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}