import { useState, useEffect } from 'react'
import blogService from './services/blog'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // haetaan blogit heti kun sovellus käynnistyy
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      } catch (error) {
        console.log('blogien haku epäonnistui', error)
      }
    }

    fetchBlogs()
  }, [])

  // tarkistetaan localStoragesta onko käyttäjä valmiiksi kirjautunut
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      try {
        const savedUser = JSON.parse(loggedUserJSON)
        if (savedUser && savedUser.username && savedUser.token) {
          setUser(savedUser)
          blogService.setToken(savedUser.token)
        }
      } catch (e) {
        console.log('localStoragen parsinta epäonnistui', e)
      }
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('kirjautuminen', username, password)

    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })

      // tallennetaan localStorageen
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(loggedUser)
      )

      // viedään token blogServiceen
      blogService.setToken(loggedUser.token)

      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('kirjautuminen epäonnistui', error)
    }
  }

  const handleLogout = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      try {
        const savedUser = JSON.parse(loggedUserJSON)
        savedUser.token = null
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(savedUser)
        )
      } catch (e) {
        console.log('localStoragen parsinta epäonnistui uloskirjautuessa', e)
      }
    }

    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (error) {
      console.log('blogin lisäys epäonnistui', error)
    }
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

      <h2>Lisää uusi blogi</h2>

      <form onSubmit={handleCreateBlog}>
        <div>
          otsikko
          <input
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          kirjoittaja
          <input
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">tallenna blogi</button>
      </form>

      <h2>Blogit</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} – {blog.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App