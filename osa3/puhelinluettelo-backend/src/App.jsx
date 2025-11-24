import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

export default function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const showNotification = (message, type = 'success') => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  // ✅ Tietojen noutaminen backendistä
  useEffect(() => {
    personsService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  // ✅ Uuden henkilön lisääminen (POST)
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
        showNotification(`Lisätty ${addedPerson.name}`, 'success')
      })
      .catch(err => {
        console.error('Error adding person:', err)
        showNotification('Adding person failed!', 'error')
      })
  }

  // ✅ Henkilön poistaminen (DELETE)
  const handleDelete = (id, name) => {
    if (!confirm(`Delete ${name}?`)) return

    personsService
      .remove(id)
      .then(() => {
        setPersons(prev => prev.filter(p => p.id !== id))
        showNotification(`Poistettu ${name}`, 'success')
      })
      .catch(err => {
        console.error('Delete failed:', err)
        showNotification(
          `Henkilön ${name} tiedot on jo valmiiksi poistettu palvelimelta`,
          'error'
        )
        personsService.getAll().then(setPersons)
      })
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notification} type={notificationType} />

      <Filter filterText={filterText} onChange={setFilterText} />

      <PersonForm
        newName={newName}
        onNameChange={setNewName}
        newNumber={newNumber}
        onNumberChange={setNewNumber}
        onSubmit={handleSubmit}
      />

      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}