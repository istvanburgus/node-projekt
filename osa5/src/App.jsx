import { useState, useEffect } from 'react'
import blogService from './services/blog'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const Notification = ({ notification }) => {
  if (!notification || !notification.message) {
    return null
  }

  const style = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid',
    backgroundColor: notification.type === 'error' ? '#fdd' : '#dfd',
    color: notification.type === 'error' ? '#900' : '#060',
  }

  return <div style={style}>{notification.message}</div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      } catch (error) {
        console.log('blogien haku epäonnistui', error)
        showNotification('blogien haku epäonnistui', 'error')
      }
    }

    fetchBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(loggedUser)
      )

      blogService.setToken(loggedUser.token)

      setUser(loggedUser)
      setUsername('')
      setPassword('')

      showNotification(
        `käyttäjä ${loggedUser.username} kirjautui sisään`,
        'success'
      )
    } catch (error) {
      console.log('kirjautuminen epäonnistui', error)
      showNotification(
        'kirjautuminen epäonnistui, tarkista tunnus tai salasana',
        'error'
      )
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
    showNotification('käyttäjä kirjautui ulos', 'success')
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      showNotification(`uusi blogi "${savedBlog.title}" lisätty`, 'success')
    } catch (error) {
      console.log('blogin lisäys epäonnistui', error)
      showNotification('blogin lisäys epäonnistui', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />

        <h2>Kirjaudu sovellukseen</h2>

        <Togglable buttonLabel="kirjaudu">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />

      <p>{user.username} kirjautunut sisään</p>
      <button onClick={handleLogout}>kirjaudu ulos</button>

      <h2>Lisää uusi blogi</h2>

      <Togglable buttonLabel="uusi blogi">
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>

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