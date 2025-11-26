// Otetaan mongoose ja dotenv käyttöön
const mongoose = require('mongoose')
require('dotenv').config()

// Luetaan MongoDB-osoite .env-tiedostosta
const url = process.env.MONGODB_URI

console.log('Yhdistetään MongoDB:hen...')

// Yhdistetään tietokantaan
mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(() => {
    console.log('Yhteys MongoDB:hen onnistui')
  })
  .catch((error) => {
    console.log('Virhe yhdistäessä MongoDB:hen:', error.message)
  })

// Skeema henkilölle
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Muokataan JSON-muotoa: _id -> id, ja poistetaan turhat kentät
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// Viedään malli (model) muualle käytettäväksi
module.exports = mongoose.model('Person', personSchema)