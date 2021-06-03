const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url =
  `mongodb+srv://fullstack:${password}@cluster0.efvpj.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phoneSchema)

if(name == null || number == null)
{
  Phonebook.find({}).then(result => {
    result.forEach(phonebook => {
      console.log(phonebook)
    })
    mongoose.connection.close()
  })
}
else
{
  console.log('yo')
  const phonebook = new Phonebook({
  name: name,
  number: number
  })
  phonebook.save().then(result => {
  console.log('phonebook entry saved!')
  mongoose.connection.close()
  })
}
