import { useState } from 'react'

export default function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' },
    { id: 2, name: 'Ada Lovelace' }
  ])


  const [newName, setNewName] = useState('')

  
  const handleSubmit = (event) => {
    event.preventDefault() 


    const newPerson = {
      id: persons.length ? Math.max(...persons.map(p => p.id)) + 1 : 1,
      name: newName.trim()
    }

    if (!newPerson.name) return

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h1>Phonebook</h1>

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
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}
