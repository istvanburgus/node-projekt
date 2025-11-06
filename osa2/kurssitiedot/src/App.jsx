import { useState } from 'react'

export default function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-1234567' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' }
  ])

  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  
  const [filterText, setFilterText] = useState('')

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

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  
  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>

      {}
      <div>
        filter shown with:{' '}
        <input
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="type to filter by name"
        />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="type a name"
          />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder="e.g. 040-1234567"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(p => (
          <li key={p.id}>
            {p.name} — {p.number}
          </li>
        ))}
      </ul>
    </div>
  )
}
