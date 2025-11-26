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

  // Tietojen noutaminen backendistä
  useEffect(() => {
    personsService
      .getAll()
      .then(data => {
        setPersons(data)
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
        showNotification('Tietojen haku epäonnistui', 'error')
      })
  }, [])

  // Uuden henkilön lisääminen (POST) + numeron päivitys (PUT)
  const handleSubmit = (event) => {
    event.preventDefault()
    const nameTrimmed = newName.trim()
    const numberTrimmed = newNumber.trim()
    if (!nameTrimmed || !numberTrimmed) return

    const existing = persons.find(
      p => p.name.toLowerCase() === nameTrimmed.toLowerCase()
    )

    // Jos henkilö on jo olemassa → päivitetään numero (PUT)
    if (existing) {
      const ok = confirm(
        `${existing.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (!ok) return

      const changedPerson = { ...existing, number: numberTrimmed }

      personsService
        .update(existing.id, changedPerson)
        .then(returnedPerson => {
          setPersons(prev =>
            prev.map(p => p.id === existing.id ? returnedPerson : p)
          )
          setNewName('')
          setNewNumber('')
          showNotification(`Päivitetty ${returnedPerson.name}`, 'success')
        })
        .catch(error => {
          console.error('Update failed:', error)
          const serverMessage = error.response?.data?.error

          if (serverMessage) {
            // Mongoose-validoinnin virheilmoitus
            showNotification(serverMessage, 'error')
          } else {
            showNotification(
              `Henkilö ${existing.name} on jo poistettu palvelimelta`,
              'error'
            )
            setPersons(prev => prev.filter(p => p.id !== existing.id))
          }
        })

      return
    }

    // Uusi henkilö (POST)
    const newPerson = {
      name: nameTrimmed,
      number: numberTrimmed,
    }

    personsService
      .create(newPerson)
      .then(addedPerson => {
        setPersons(prev => prev.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Lisätty ${addedPerson.name}`, 'success')
      })
      .catch(error => {
        console.error('Error adding person:', error)
        const msg = error.response?.data?.error || 'Adding person failed!'
        showNotification(msg, 'error')
      })
  }

  // Henkilön poistaminen (DELETE)
  const handleDelete = (id, name) => {
    if (!confirm(`Delete ${name}?`)) return

    personsService
      .remove(id)
      .then(() => {
        setPersons(prev => prev.filter(p => p.id !== id))
        showNotification(`Poistettu ${name}`, 'success')
      })
      .catch(error => {
        console.error('Delete failed:', error)
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