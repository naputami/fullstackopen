import React from 'react'
import { useState, useEffect } from 'react'
import axios from  'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import FilterPerson from './components/FilterPerson'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log( 'effect')
    axios
    .get(' http://localhost:3001/persons')
    .then(response => {
      console.log('promise fullfilled')
      setPersons(response.data)
    })
  }, [])

  
  const addName = (event) => {
    event.preventDefault()
    const foundDuplicatedName = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase())
    if(foundDuplicatedName !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const nameObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObj))
    setNewName('')
    setNewNumber('')
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setFilterName(event.target.value)
  }
  
  const filteredPerson = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPerson filterName={filterName} handleFilterInput={handleFilterInput} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameInput={handleNameInput} newNumber={newNumber} handleNumberInput={handleNumberInput}/>
      <h3>Numbers</h3>
      <Persons filteredPerson={filteredPerson} persons={persons} filterName={filterName} />
    </div>
  )
}

export default App
