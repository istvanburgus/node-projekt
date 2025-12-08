import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

test('näyttää oletuksena vain otsikon ja kirjoittajan', () => {
  const blogi = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'http://esimerkki.fi',
    likes: 10,
    user: {
      username: 'kevin',
      name: 'Kevin Testaaja',
      id: '12345',
    },
    id: 'abc123',
  }

  const kayttaja = {
    username: 'kevin',
    name: 'Kevin Testaaja',
  }

  render(
    <Blog
      blog={blogi}
      onLike={() => {}}
      onDelete={() => {}}
      currentUser={kayttaja}
    />
  )

  const otsikkoJaKirjoittaja = screen.getByText('Testiblogi Testaaja')
  expect(otsikkoJaKirjoittaja).toBeInTheDocument()

  const urlElementti = screen.queryByText('http://esimerkki.fi')
  expect(urlElementti).toBeNull()

  const tykkayksetElementti = screen.queryByText(/tykkäyksiä/i)
  expect(tykkayksetElementti).toBeNull()
})