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
    author: 'Tekijä 3',
    url: 'http://example.com/3',
    likes: 12,
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
    assert.strictEqual(result, 24) // 7 + 5 + 12
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
    assert.deepStrictEqual(result, montaBlogia[2])
  })

  test('jos usealla blogilla on sama eniten tykkäyksiä, palautetaan ensimmäinen niistä', () => {
    const listaTasapeli = [
      {
        title: 'Blogi 1',
        author: 'Tekijä A',
        url: 'http://example.com/a',
        likes: 15,
      },
      {
        title: 'Blogi 2',
        author: 'Tekijä B',
        url: 'http://example.com/b',
        likes: 15,
      },
      {
        title: 'Blogi 3',
        author: 'Tekijä C',
        url: 'http://example.com/c',
        likes: 10,
      },
    ]

    const result = listHelper.favouriteBlog(listaTasapeli)
    assert.deepStrictEqual(result, listaTasapeli[0])
  })
})