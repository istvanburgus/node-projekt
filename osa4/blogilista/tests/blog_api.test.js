const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

// tehdään supertest-olio sovelluksesta
const api = supertest(app)

// testejä varten alustettava blogilista
const initialBlogs = [
  {
    title: 'Ensimmäinen blogi',
    author: 'Testaaja 1',
    url: 'http://example.com/1',
    likes: 5,
  },
  {
    title: 'Toinen blogi',
    author: 'Testaaja 2',
    url: 'http://example.com/2',
    likes: 10,
  },
]

// ajetaan ennen jokaista testiä:
// tyhjennetään tietokanta ja lisätään initialBlogs-listan blogit
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

// testi 4.6: /api/blogs palauttaa oikean määrän blogeja
test('GET /api/blogs palauttaa oikean määrän blogeja', async () => {
  const response = await api.get('/api/blogs')

  // varmistetaan että statuskoodi on 200
  assert.strictEqual(response.statusCode, 200)

  // varmistetaan että määrä vastaa initialBlogs.length arvoa
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// suljetaan mongoose-yhteys testien lopuksi
after(async () => {
  await mongoose.connection.close()
})