const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.username.length < 3) {
    return response.status(400).json({ error: 'Username must be 3 or more characters' })
  }
  if (body.password.length < 3)
  {
    return response.status(400).json({ error: 'Password must be 3 or more characters' })
  }
  const userSearch = await User.findOne({ username: body.username })
  if (userSearch)
  {
    return response.status(400).json({ error: 'Username already exists please choose a different username' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url:1 })

  response.json(users)
})

module.exports = usersRouter