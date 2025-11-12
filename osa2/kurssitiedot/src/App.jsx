import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

export default function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // 2.11/2.14
  useEffect(() => {
  personsService
    .getAll()
    .then(data => {
      setPersons(data)
      setError(null)
    })
    .catch(err => {
      setError('Tietojen haku epäonnistui')
      console.error(err)
    })
    .finally(() => setLoading(false))
}, [])

  // 2.12: POST
  const handleSubmit = (event) => {
  event.preventDefault()
  const nameTrimmed = newName.trim()
  const numberTrimmed = newNumber.trim()
  if (!nameTrimmed || !numberTrimmed) return

  const exists = persons.some(
    p => p.name.toLowerCase() === nameTrimmed.toLowerCase()
  )
  if (exists) {
    alert(`${nameTrimmed} is already added to phonebook`)
    return
  }

  const newPerson = {
    name: nameTrimmed,
    number: numberTrimmed
  }

  personsService
    .create(newPerson)
    .then(addedPerson => {
      setPersons(prev => prev.concat(addedPerson))
      setNewName('')
      setNewNumber('')
    })
    .catch(err => {
      console.error('Error adding person:', err)
      alert('Adding person failed!')
    })
}

  // 2.15: DELETE
  const handleDelete = (id, name) => {
    if (!confirm(`Delete ${name}?`)) return
    personsService
      .remove(id)
      .then(() => {
        setPersons(prev => prev.filter(p => p.id !== id))
      })
      .catch(err => {
        console.error('Delete failed:', err)
        alert('Delete failed (maybe already removed on server).')
        personsService.getAll().then(setPersons)
      })
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filterText={filterText} onChange={setFilterText} />

      <PersonForm
        newName={newName}
        onNameChange={setNewName}
        newNumber={newNumber}
        onNumberChange={setNewNumber}
        onSubmit={handleSubmit}
      />

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!loading && !error && (
        <Persons persons={filteredPersons} onDelete={handleDelete} />
      )}
    </div>
  )
}
