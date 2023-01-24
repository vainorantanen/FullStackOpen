import React, { useEffect, useState } from 'react'

import Success from './components/Successmessage'
import Alertmessage from './components/Alertmessage'
import Filter from './components/Filternames'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import './index.css'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    //lisätään nameObject eli henkilön object

    const nameObject = {
      name: newName,
      number: newNumber
    }


    const checkForPerson = persons.find(person => person.name.toLowerCase() === nameObject.name.toLowerCase())

    if (checkForPerson && checkForPerson.number === newNumber) {
      Alertmessage(nameObject)      
    } 


    if (checkForPerson && checkForPerson.number !== newNumber) {
      //katsotaan jos löytyy jo puhelinluettelosta
      
      if (window.confirm(`${checkForPerson.name} is already added to phonebook, replace the old number with the new one?`)) {
        const updatedPerson = { ...checkForPerson, number: newNumber }
        personService
          .update(checkForPerson.id, updatedPerson)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id !== checkForPerson.id ? person : returnedPerson))
            setSuccessMessage(`Number changed to ${nameObject.number}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          })
          .catch(error =>
            setPersons(persons
              .filter(person => 
                person.name !== checkForPerson.name
              )
            )
          )
            setNotification({
              text: `${checkForPerson.name} has already been deleted from the server.`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
      }
    } 
    if (!checkForPerson) {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          console.log("persons: ", persons)
          console.log("Returned: ", returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(`Added ${nameObject.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        .catch(error => {
          setNotification({
            text: error.response.data.error, 
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePersonFromPhonebook = (id) => {
    const person = persons.find(p => p.id === id)
    //console.log(person)
    
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
        })
      setPersons(persons.filter(person => person.id !== id))
      setSuccessMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
    }
  }


  const personsToShowAfterFiltering = 
    filter === ''  ? persons : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()))

      return (
    <div>
      <h2 id='italic'>Phonebook</h2>
      <Notification notification={notification} />
      <Success message={successMessage} />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new person to the phonebook</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}

        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        
        addPerson={addPerson}
        
      />
      <h3 id='num'>Numbers</h3>
      <Persons
        persons={personsToShowAfterFiltering}
        deletePersonFromPhonebook={deletePersonFromPhonebook}
      />
    </div>
  )
}

export default App