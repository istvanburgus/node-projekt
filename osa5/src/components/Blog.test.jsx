import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
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

    // Otsikko + kirjoittaja näkyvät
    expect(
      screen.getByText('Testiblogi Testaaja', { exact: false })
    ).toBeInTheDocument()

    // Nämä EIVÄT näy ennen napin painamista
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

  // Tehtävä 5.15 – testi like-napille
  test('kutsuu like-handleriä kahdesti kun like-nappia painetaan kahdesti', async () => {
    const blog = {
      title: 'Testiblogi',
      author: 'Testaaja',
      url: 'http://example.com',
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

    // Mock-funktio like-napille
    const mockLikeHandler = vi.fn()

    render(
      <Blog
        blog={blog}
        onLike={mockLikeHandler}
        onDelete={() => {}}
        currentUser={currentUser}
      />
    )

    const user = userEvent.setup()

    // like-nappi näkyy vasta näkymän avaamisen jälkeen
    const viewButton = screen.getByText('näytä')
    await user.click(viewButton)

    const likeButton = screen.getByText('tykkää')

    // painetaan kahdesti
    await user.click(likeButton)
    await user.click(likeButton)

    // mockLikeHandler pitäisi olla kutsuttu 2 kertaa
    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})