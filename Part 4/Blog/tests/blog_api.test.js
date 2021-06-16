const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)
    expect(title).toContain(
      'Writing Javascript for beginners'
    )
  })
})

describe('viewing a specific blog', () => {
  test('the id exists', async () => {
    const response = await api.get('/api/blogs')

    const id = response.body.map(r => r.id)
    expect(id).toBeDefined()
  })
})
describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Creating a MongoDb Database',
      author: 'Kent C Dodds',
      url: 'www.javascriptmaster.com/creatingmongodb',
      likes: 14
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Creating a MongoDb Database'
    )
  })

  test('blog without likes is added with default', async () => {
    const newBlog = {
      title: 'Creating a MongoDb Database',
      author: 'Kent C Dodds',
      url: 'www.javascriptmaster.com/creatingmongodb',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).toContain(0)
  })
  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Kent C Dodds',
      likes: 3
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})
describe('updating of a blog', () => {
  test('updating a blog with a new like value', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const UpdatedBlog = {
      title: 'How to master Javascript',
      author: 'Kent C Dodds',
      url: 'www.javascriptmaster.com/masteringjavascript',
      likes: 9
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(UpdatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.map(r => r.likes)

    expect(likes).toContain(9)
  })
})
afterAll(() => {
  mongoose.connection.close()
})