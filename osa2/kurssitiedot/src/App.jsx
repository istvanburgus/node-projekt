import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

export default function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // 2.11
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    axios.get('/persons.json')
      .then(res => {
        if (!cancelled) {
          setPersons(res.data || [])
          setError(null)
        }
      })
      .catch(err => {
        if (!cancelled) setError('Tietojen haku epäonnistui (persons.json)')
        console.error(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

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
      id: persons.length ? Math.max(...persons.map(p => p.id)) + 1 : 1,
      name: nameTrimmed,
      number: numberTrimmed
    }

    setPersons(prev => prev.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
      {error && <p style={{color:'crimson'}}>{error}</p>}

      {!loading && !error && <Persons persons={filteredPersons} />}
    </div>
  )
}
