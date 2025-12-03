const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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

// ennen jokaista testiä tyhjennetään tietokanta ja lisätään alkuperäiset blogit
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

// 4.6 ja 4.9: GET /api/blogs

describe('GET /api/blogs', () => {
  test('palauttaa oikean määrän blogeja', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.statusCode, 200)
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('palauttaa blogit, joilla on kenttä id', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body
    assert.ok(blogs.length > 0)

    const firstBlog = blogs[0]

    // tarkistetaan että id on olemassa
    assert.ok(firstBlog.id)
  })
})

// 4.10, 4.11 ja 4.12: POST /api/blogs

describe('POST /api/blogs', () => {
  test('lisää uuden blogin ja blogien määrä kasvaa yhdellä', async () => {
    const newBlog = {
      title: 'Uusi blogi',
      author: 'Testaaja 3',
      url: 'http://example.com/3',
      likes: 7,
    }

    const blogsEnnen = await Blog.find({})
    const määräEnnen = blogsEnnen.length

    const response = await api.post('/api/blogs').send(newBlog)

    assert.strictEqual(response.statusCode, 201)

    const blogsJälkeen = await Blog.find({})
    const määräJälkeen = blogsJälkeen.length

    assert.strictEqual(määräJälkeen, määräEnnen + 1)
  })

  test('lisätty blogi löytyy tietokannasta oikealla sisällöllä', async () => {
    const newBlog = {
      title: 'Uusi blogi 2',
      author: 'Testaaja 4',
      url: 'http://example.com/4',
      likes: 12,
    }

    await api.post('/api/blogs').send(newBlog)

    const blogsJälkeen = await Blog.find({})
    const titles = blogsJälkeen.map((b) => b.title)

    assert.ok(titles.includes('Uusi blogi 2'))
  })

  // 4.11: likes on oletuksena 0 jos sitä ei lähetetä
  test('likes on 0 jos sitä ei lähetetä', async () => {
    const uusiBlogi = {
      title: 'Blogi ilman tykkäyksiä',
      author: 'Testaaja 1',
      url: 'http://esimerkki.fi/tykkaykseton',
    }

    const vastaus = await api
      .post('/api/blogs')
      .send(uusiBlogi)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(vastaus.body.likes, 0)

    const blogitKannassa = await Blog.find({})
    const lisatty = blogitKannassa.find((b) => b.title === uusiBlogi.title)
    assert.strictEqual(lisatty.likes, 0)
  })

  // 4.12: blogin luonti epäonnistuu jos title puuttuu
  test('palauttaa 400 jos title puuttuu', async () => {
    const blogiIlmanTitlea = {
      author: 'Testaaja 1',
      url: 'http://esimerkki.fi/ilman-titlea',
      likes: 3,
    }

    const blogitEnnen = await Blog.find({})

    await api
      .post('/api/blogs')
      .send(blogiIlmanTitlea)
      .expect(400)

    const blogitJalkeen = await Blog.find({})
    assert.strictEqual(blogitJalkeen.length, blogitEnnen.length)
  })

  // 4.12: blogin luonti epäonnistuu jos url puuttuu
  test('palauttaa 400 jos url puuttuu', async () => {
    const blogiIlmanUrla = {
      title: 'Ilman urla oleva blogi',
      author: 'Testaaja 1',
      likes: 3,
    }

    const blogitEnnen = await Blog.find({})

    await api
      .post('/api/blogs')
      .send(blogiIlmanUrla)
      .expect(400)

    const blogitJalkeen = await Blog.find({})
    assert.strictEqual(blogitJalkeen.length, blogitEnnen.length)
  })
})

// suljetaan tietokantayhteys testien lopuksi
after(async () => {
  await mongoose.connection.close()
})