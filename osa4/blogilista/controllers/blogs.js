const express = require('express')
const Blog = require('../models/blog')

const blogienReititin = express.Router()

// Hae kaikki blogit
blogienReititin.get('/', async (pyynto, vastaus, next) => {
  try {
    const blogit = await Blog.find({})
    vastaus.json(blogit)
  } catch (virhe) {
    next(virhe)
  }
})

// Lisää uusi blogi
blogienReititin.post('/', async (pyynto, vastaus, next) => {
  try {
    const { title, author, url, likes } = pyynto.body

    // Title TAI url puuttuu -> 400
    if (!title || !url) {
      return vastaus.status(400).json({ virhe: 'title tai url puuttuu' })
    }

    const uusiBlogi = new Blog({
      title,
      author,
      url,
      likes, 
    })

    const tallennettuBlogi = await uusiBlogi.save()
    vastaus.status(201).json(tallennettuBlogi)
  } catch (virhe) {
    next(virhe)
  }
})

module.exports = blogienReititin