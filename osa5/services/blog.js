const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// hae kaikki blogit
const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('blogien haku epäonnistui')
  }
  const data = await response.json()
  return data
}

// lisää uusi blogi, vain jos token on asetettu
const create = async (newBlog) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBlog),
  }

  if (token) {
    config.headers['Authorization'] = token
  }

  const response = await fetch(baseUrl, config)
  if (!response.ok) {
    throw new Error('blogin lisäys epäonnistui')
  }

  const data = await response.json()
  return data
}

export default { getAll, create, setToken }