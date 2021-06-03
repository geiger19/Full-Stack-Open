require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const Phonebook = require('./models/phonebook')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// this has to be the last loaded middleware.

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(phonebook => {
    response.json(phonebook)
  })
})

app.get('/api/info', (req, res) => {
  Phonebook.find({}).then(phonebook => {
    var dataobject = phonebook
    var keyCount  = Object.keys(dataobject).length
    console.log('hello')
    res.send('Phonebook has info for ' + keyCount + ' people<br/><br/> ' + Date())
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Phonebook({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPhonebook => {
    response.json(savedPhonebook)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id).then(phonebook => {
    if (phonebook) {
      response.json(phonebook)
    } else {
      response.status(404).end()
    }
  })
    // eslint-disable-next-line no-undef
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const phonebook = {
    name: body.name,
    number: body.number,
  }

  Phonebook.findByIdAndUpdate(request.params.id, phonebook, { new: true,runValidators: true })
    .then(updatedPhonebook => {
      response.json(updatedPhonebook)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})