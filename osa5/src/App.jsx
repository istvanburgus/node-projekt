import { useState, useEffect } from 'react'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // tarkistetaan onko käyttäjä jo tallennettu localStorageen
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      try {
        const savedUser = JSON.parse(loggedUserJSON)
        // jos token ei ole null, pidetään käyttäjä kirjautuneena
        if (savedUser && savedUser.username && savedUser.token) {
          setUser(savedUser)
        }
      } catch (e) {
        console.log('localStoragen parsinta epäonnistui', e)
      }
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('kirjautuminen', username, password)

    // vain simuloidaan tokenin talletus
    const loggedUser = {
      username,
      token: 'dummy-token',
    }

    // tallennetaan kirjautumistiedot localStorageen
    window.localStorage.setItem(
      'loggedBlogAppUser',
      JSON.stringify(loggedUser)
    )

    setUser(loggedUser)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    // haetaan mahdollinen tallennettu käyttäjä
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      try {
        const savedUser = JSON.parse(loggedUserJSON)
        // asetetaan tokeniksi null, kuten tehtävässä pyydetään
        savedUser.token = null
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(savedUser)
        )
      } catch (e) {
        console.log('localStoragen parsinta epäonnistui uloskirjautuessa', e)
      }
    }

    // päivitetään myös komponentin tila
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Kirjaudu sovellukseen</h2>

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            salasana
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <p>{user.username} kirjautunut sisään</p>
      <button onClick={handleLogout}>kirjaudu ulos</button>
    </div>
  )
}

export default App
