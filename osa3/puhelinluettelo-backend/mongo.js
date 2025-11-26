// Otetaan mongoose käyttöön
const mongoose = require('mongoose')

// Tarkistetaan, että salasana on annettu komentorivillä
if (process.argv.length < 3) {
  console.log('Anna salasana argumenttina')
  process.exit(1)
}

// Komentorivin 3. argumentti = salasana
const password = process.argv[2]

// MongoDB-yhteyden osoite (oma connection string)
const url =
  `mongodb+srv://Istvan:${password}@cluster0.lwahvea.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

// Asetetaan strictQuery pois (mongoose suositus)
mongoose.set('strictQuery', false)

// Yhdistetään tietokantaan
mongoose.connect(url)

// Skeema henkilötietoja varten
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Malli (model), joka vastaa phonebookApp-tietokannan kokoelmaa
const Person = mongoose.model('Person', personSchema)

// Jos komentorivillä on vain salasana → tulostetaan kaikki henkilöt
if (process.argv.length === 3) {
  console.log('Puhelinluettelo:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

// Jos komentorivillä on 5 argumenttia → lisätään uusi henkilö tietokantaan
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`Lisätty ${name} numero ${number} puhelinluetteloon`)
    mongoose.connection.close()
  })
}