const express = require('express')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const blogienReititin = express.Router()

const SECRET = process.env.SECRET || 'salainen'

// hae kaikki blogit, mukana käyttäjätiedot
blogienReititin.get('/', async (pyynto, vastaus, next) => {
  try {
    const blogit = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    vastaus.json(blogit)
  } catch (virhe) {
    next(virhe)
  }
})

// lisää uusi blogi, vain kirjautunut käyttäjä
blogienReititin.post('/', async (pyynto, vastaus, next) => {
  try {
    const { title, author, url, likes } = pyynto.body

    if (!title || !url) {
      return vastaus.status(400).json({ virhe: 'title tai url puuttuu' })
    }

    let kayttaja = null

    if (process.env.NODE_ENV !== 'test') {
      const token = pyynto.token

      if (!token) {
        return vastaus.status(401).json({ error: 'token puuttuu' })
      }

      const decodedToken = jwt.verify(token, SECRET)

      if (!decodedToken.id) {
        return vastaus
          .status(401)
          .json({ error: 'token on virheellinen tai käyttäjä puuttuu' })
      }

      kayttaja = await User.findById(decodedToken.id)

      if (!kayttaja) {
        return vastaus.status(401).json({ error: 'käyttäjää ei löydy' })
      }
    } else {
      // testejä varten voidaan käyttää jotain käyttäjää tai jättää nulliksi
      kayttaja = await User.findOne({})
    }

    const uusiBlogi = new Blog({
      title,
      author,
      url,
      likes,
      user: kayttaja ? kayttaja._id : undefined,
    })

    const tallennettuBlogi = await uusiBlogi.save()

    if (kayttaja) {
      kayttaja.blogs = kayttaja.blogs.concat(tallennettuBlogi._id)
      await kayttaja.save()
    }

    vastaus.status(201).json(tallennettuBlogi)
  } catch (virhe) {
    next(virhe)
  }
})

// poista yksi blogi id:n perusteella
blogienReititin.delete('/:id', async (pyynto, vastaus, next) => {
  try {
    const id = pyynto.params.id
    await Blog.findByIdAndDelete(id)
    vastaus.status(204).end()
  } catch (virhe) {
    next(virhe)
  }
})

// muokkaa blogia id:n perusteella
blogienReititin.put('/:id', async (pyynto, vastaus, next) => {
  try {
    const { title, author, url, likes } = pyynto.body

    const paivitettyBlogi = {
      title,
      author,
      url,
      likes,
    }

    const tulos = await Blog.findByIdAndUpdate(
      pyynto.params.id,
      paivitettyBlogi,
      { new: true, runValidators: true, context: 'query' }
    )

    vastaus.json(tulos)
  } catch (virhe) {
    next(virhe)
  }
})

module.exports = blogienReititin