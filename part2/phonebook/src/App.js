import React from 'react'
import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import FilterPerson from './components/FilterPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

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
