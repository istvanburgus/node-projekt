import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog-komponentti', () => {
  test('näyttää oletuksena vain otsikon ja kirjoittajan', () => {
    const blog = {
      title: 'Testiblogi',
      author: 'Testaaja',
      url: 'http://example.com/testi',
      likes: 5,
      user: {
        username: 'kevin',
        name: 'Kevin Testaaja',
      },
    }

    const currentUser = {
      username: 'kevin',
      name: 'Kevin Testaaja',
    }

    render(
      <Blog
        blog={blog}
        onLike={() => {}}
        onDelete={() => {}}
        currentUser={currentUser}
      />
    )

    // otsikko + kirjoittaja näkyvät
    expect(
      screen.getByText('Testiblogi Testaaja', { exact: false })
    ).toBeInTheDocument()

    // nämä EIVÄT näy ennen napin painamista
    expect(screen.queryByText('http://example.com/testi')).not.toBeInTheDocument()
    expect(screen.queryByText(/tykkäyksiä 5/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Kevin Testaaja/i)).not.toBeInTheDocument()
  })

  test('näyttää urlin, tykkäykset ja käyttäjänimen kun view-nappia painetaan', async () => {
    const blog = {
      title: 'Testiblogi',
      author: 'Testaaja',
      url: 'http://example.com/testi',
      likes: 5,
      user: {
        username: 'kevin',
        name: 'Kevin Testaaja',
      },
    }

    const currentUser = {
      username: 'kevin',
      name: 'Kevin Testaaja',
    }

    render(
      <Blog
        blog={blog}
        onLike={() => {}}
        onDelete={() => {}}
        currentUser={currentUser}
      />
    )

    const user = userEvent.setup()

    // ennen painallusta ei näy
    expect(screen.queryByText('http://example.com/testi')).not.toBeInTheDocument()
    expect(screen.queryByText(/tykkäyksiä 5/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Kevin Testaaja/i)).not.toBeInTheDocument()

    // painetaan "näytä" nappia
    const button = screen.getByText('näytä')
    await user.click(button)

    // nyt kaiken pitää näkyä
    expect(screen.getByText('http://example.com/testi')).toBeInTheDocument()
    expect(screen.getByText(/tykkäyksiä 5/i)).toBeInTheDocument()
    expect(screen.getByText(/Kevin Testaaja/i)).toBeInTheDocument()
  })
})