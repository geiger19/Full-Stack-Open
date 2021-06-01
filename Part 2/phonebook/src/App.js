import React, { useState, useEffect } from 'react'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import personService from './services/phonebook'

const App = () => {
  //assign dummy data to persons
  //initialise useState
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ persons, setPersons ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])
  //Add the name to persons
  const addName = (event) => {
    event.preventDefault()
    if (!(persons.filter(e => e.name === newName).length > 0)) 
    {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(nameObject)
        .then(returnedName => {
        setPersons(persons.concat(returnedName))
        setErrorMessage(
          `Added '${newName}'`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(
            `${error.response.data.error}`
          )
          // this is the way to access the error message
          console.log(error.response.data.error)
        })
    }
    //Modify the number for a specific person
    else
    {
      if (persons.filter(e => e.number !== newNumber))
      {
        const person = persons.find(person => person.name === newName)
        if (window.confirm(`${person.name} is already added to the phonebook replace old number with the new one?`))
        {
          const nameObject = {
            name: newName,
            number: newNumber,
          }
          personService
            .update(person.id,nameObject)
            setErrorMessage(
              `Added New Number for '${newName}'`
            )
            setNewName('')
            setNewNumber('')
        }
    }
    }
  }
  //Delete the user from the system
  const deleteName = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) 
    {
      personService
      .removePerson(id)
      .then(response => {
        setErrorMessage(
          `Deleted '${person.name}'` 
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setPersons(persons.filter(person => person.id !== id))
    }
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="message">
        {message}
      </div>
    )
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <p>filter shown with 
        <Filter handleFilterChange={(event) => handleFilterChange(event)} />
      </p>
        <PersonForm addName={(event) => addName(event)} newNumber={newNumber} newName={newName} handleNameChange={(event) => handleNameChange(event)} handleNumberChange={(event) => handleNumberChange(event)}/>
      <h2>Numbers</h2>
        {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
                .map(persons =>  
          <Persons key={persons.id} name={persons.name} number={persons.number} deleteName={() => deleteName(persons.id)} />
        )}
      <div>debug: {newName}</div>
    </div>
  )
}
export default App