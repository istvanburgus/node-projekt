const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')

// 4.3 dummy-funktio

describe('dummy-funktio', () => {
  test('palauttaa aina luvun 1', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

// Testeissä käytettävät listat
const tyhjaLista = []

const yksiBlogi = [
  {
    title: 'Yksi blogi',
    author: 'Kevin',
    url: 'http://example.com/one',
    likes: 5,
  },
]

const montaBlogia = [
  {
    title: 'Ensimmäinen blogi',
    author: 'Tekijä 1',
    url: 'http://example.com/1',
    likes: 7,
  },
  {
    title: 'Toinen blogi',
    author: 'Tekijä 2',
    url: 'http://example.com/2',
    likes: 5,
  },
  {
    title: 'Kolmas blogi',
    author: 'Tekijä 1',
    url: 'http://example.com/3',
    likes: 12,
  },
  {
    title: 'Neljäs blogi',
    author: 'Tekijä 3',
    url: 'http://example.com/4',
    likes: 10,
  },
]

// 4.4 totalLikes

describe('totalLikes-funktio', () => {
  test('palauttaa 0 tyhjälle listalle', () => {
    const result = listHelper.totalLikes(tyhjaLista)
    assert.strictEqual(result, 0)
  })

  test('palauttaa yhden blogin tykkäykset', () => {
    const result = listHelper.totalLikes(yksiBlogi)
    assert.strictEqual(result, 5)
  })

  test('laskee usean blogin tykkäykset oikein', () => {
    const result = listHelper.totalLikes(montaBlogia)
    // 7 + 5 + 12 + 10 = 34
    assert.strictEqual(result, 34)
  })
})

// 4.5 favouriteBlog

describe('favouriteBlog-funktio', () => {
  test('palauttaa null tyhjälle listalle', () => {
    const result = listHelper.favouriteBlog(tyhjaLista)
    assert.strictEqual(result, null)
  })

  test('palauttaa ainoan blogin jos listassa on yksi blogi', () => {
    const result = listHelper.favouriteBlog(yksiBlogi)
    assert.deepStrictEqual(result, yksiBlogi[0])
  })

  test('palauttaa eniten tykkäyksiä saaneen blogin', () => {
    const result = listHelper.favouriteBlog(montaBlogia)
    // montaBlogia[2]: likes = 12 on suurin
    assert.deepStrictEqual(result, montaBlogia[2])
  })
})

// 4.6 mostBlogs

describe('mostBlogs-funktio', () => {
  test('palauttaa null tyhjälle listalle', () => {
    const result = listHelper.mostBlogs(tyhjaLista)
    assert.strictEqual(result, null)
  })

  test('palauttaa oikean kirjoittajan kun listassa yksi blogi', () => {
    const result = listHelper.mostBlogs(yksiBlogi)
    assert.deepStrictEqual(result, {
      author: 'Kevin',
      blogs: 1,
    })
  })

  test('palauttaa kirjoittajan jolla eniten blogeja', () => {
    const result = listHelper.mostBlogs(montaBlogia)
    // Tekijä 1: 2 blogia, Tekijä 2: 1, Tekijä 3: 1
    assert.deepStrictEqual(result, {
      author: 'Tekijä 1',
      blogs: 2,
    })
  })
})

// 4.7 mostLikes

describe('mostLikes-funktio', () => {
  test('palauttaa null tyhjälle listalle', () => {
    const result = listHelper.mostLikes(tyhjaLista)
    assert.strictEqual(result, null)
  })

  test('palauttaa oikean kirjoittajan kun listassa yksi blogi', () => {
    const result = listHelper.mostLikes(yksiBlogi)
    assert.deepStrictEqual(result, {
      author: 'Kevin',
      likes: 5,
    })
  })

  test('palauttaa kirjoittajan jonka blogeilla eniten tykkäyksiä yhteensä', () => {
    const result = listHelper.mostLikes(montaBlogia)
    // Tekijä 1: 7 + 12 = 19, Tekijä 2: 5, Tekijä 3: 10
    assert.deepStrictEqual(result, {
      author: 'Tekijä 1',
      likes: 19,
    })
  })
})