import { useState } from 'react'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('kirjautuminen', username, password)

    setUser({ username })
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
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