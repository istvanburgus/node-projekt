const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Middlewaret
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

// Otetaan Person-malli käyttöön
const Person = require('./models/person')

// Juuri
app.get('/', (request, response) => {
  response.send('<h1>Puhelinluettelo backend</h1>')
})

// Info-sivu (päivitetty tietokantaan)
app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      const määrä = persons.length
      const aika = new Date().toString()

      response.send(`
        <p>Puhelinluettelossa on ${määrä} henkilön tiedot</p>
        <p>${aika}</p>
      `)
    })
    .catch(error => next(error))
})

// Kaikki henkilöt (GET /api/persons)
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error))
})

// Yksittäinen henkilö id:n perusteella
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Henkilön poisto
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

// Uuden henkilön lisäys
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name and number are required' })
  }

  Person.findOne({ name: body.name })
    .then(existing => {
      if (existing) {
        return response.status(400).json({ error: 'name must be unique' })
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      return person.save()
    })
    .then(savedPerson => {
      if (savedPerson) {
        response.json(savedPerson)
      }
    })
    .catch(error => next(error))
})


//  Henkilön numeron päivitys (PUT /api/persons/:id)
app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body

  if (!number) {
    return response.status(400).json({ error: 'number is required' })
  }

  Person.findByIdAndUpdate(
    request.params.id,
    { number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


// Tuntematon endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


// Virheenkäsittelijä
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)


// Portti
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})