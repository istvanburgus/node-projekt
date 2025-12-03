const express = require('express')
const Blog = require('../models/blog')

const blogienReititin = express.Router()

// hae kaikki blogit
blogienReititin.get('/', async (pyynto, vastaus, next) => {
  try {
    const blogit = await Blog.find({})
    vastaus.json(blogit)
  } catch (virhe) {
    next(virhe)
  }
})

// lisää uusi blogi
blogienReititin.post('/', async (pyynto, vastaus, next) => {
  try {
    const { title, author, url, likes } = pyynto.body

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