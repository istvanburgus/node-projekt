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

// Custom-validointi puhelinnumerolle
const numberValidator = (value) => {
  if (!value) return false

  // Pituus vähintään 8 merkkiä
  if (value.length < 8) return false

  // Pitää sisältää tasan yhden väliviivan
  const parts = value.split('-')
  if (parts.length !== 2) return false

  const [prefix, suffix] = parts

  // Ensimmäinen osa: tasan 3 numeroa
  if (!/^\d{3}$/.test(prefix)) return false

  // Toinen osa: vähintään 4 numeroa
  if (!/^\d{4,}$/.test(suffix)) return false

  return true
}

// Skeema henkilölle
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Nimen tulee olla vähintään 3 merkkiä pitkä'],
    required: true,
  },
  number: {
    type: String,
    required: [true, 'Phone number required'],
    validate: {
      validator: numberValidator,
      message: props => `${props.value} ei ole kelvollinen puhelinnumero!`
    }
  },
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