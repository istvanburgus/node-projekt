import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

// GET
const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

// POST
const create = newPerson => {
  return axios.post(baseUrl, newPerson).then(res => res.data)
}

// DELETE
const remove = id => {
  return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
}


export default { getAll, create, remove }