const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('blogien haku epäonnistui')
  }
  const data = await response.json()
  return data
}

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

const update = async (id, updatedBlog) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBlog),
  }

  if (token) {
    config.headers['Authorization'] = token
  }

  const response = await fetch(`${baseUrl}/${id}`, config)
  if (!response.ok) {
    throw new Error('blogin päivitys epäonnistui')
  }

  const data = await response.json()
  return data
}

export default { getAll, create, update, setToken }