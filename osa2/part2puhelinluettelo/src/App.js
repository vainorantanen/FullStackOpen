import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'
import Success from './components/SuccesfulAdd'

const Name = ({person}) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  )
}

const Filter = (props) => {
  console.log("FILTERIN", props)
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.onChange}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [filterDetails, setNewFilter] = useState('')
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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName,
      number: newNumber,
      id: persons.length +1,
    }
    const lista = []
    for (var i = 0; i < persons.length; i++) {
      lista.push(persons[i].name)
    }
    //console.log(lista)
    if (lista.includes(nameObj.name)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        // etsitään jo olemassa olevan nimen id
        const etsittyHenkilo = persons.find(person => person.name === nameObj.name)
        //console.log("Henkilo jonka numero muutetaan: ", etsittyHenkilo)
        const henkilo = persons.find(person => person.id === etsittyHenkilo.id)
        const changedHenkilo = {...henkilo, number: nameObj.number}
        //console.log("muuttunut hlo: " , changedHenkilo)
        personService
          .update(henkilo.id, changedHenkilo)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== etsittyHenkilo.id ? person : changedHenkilo))
            setSuccessMessage(`Number changed to ${nameObj.number}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          })
          .catch(error => {
            alert(
              `the note '${henkilo.name}' was already deleted from server`
            )
            setPersons(persons.filter(n => n.id !== henkilo.id))
          })
          setNewName('')
          setNewNumber('')
          } else {
            return;
          }
      
    } else {
      console.log("adding...")
      personService
        .create(nameObj)
        .then(returnedPerson => {
          //console.log("R", returnedPerson)
          //console.log(persons)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${nameObj.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
      })
    }
  }

  const poista = (id) => {
    const hlo = {}
    for (var i = 0; i < persons.length; i++) {
      if (persons[i].id === id) {
        hlo.name = persons[i].name
      }
    }
    if (window.confirm(`Delete ${hlo.name} ??`)) {

    personService
      .deletePerson(id)
      .then(deletedPerson => {
        //console.log("personit", persons)
        setSuccessMessage(`Deleted ${hlo.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        setPersons(persons.filter(p => p.id !== id))
      })
    } else {
      return
    }
    }

  const namesToShow = showAll ? persons : persons.filter(person => person.name.includes(filterDetails))

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successMessage} />
      <div>
        <Filter value={filterDetails} onChange={handleFilterChange}/>
      </div>
      <br></br>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br></br>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <br></br>
      <h2>Numbers</h2>
      <div>
        <ul>
          {namesToShow.map(person => <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => poista(person.id)}>
              Delete
            </button>
            </li>)}
        </ul>
      </div>
    </div>
  )

}

export default App