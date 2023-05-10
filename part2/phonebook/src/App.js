// @ts-nocheck
import React from 'react'
import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebookServices'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import FilterPerson from './components/FilterPerson'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [messageContent, setMessageContent] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    phonebookServices
    .getAllPersons()
    .then(response => {
      setPersons(response.data)
    })
    .catch(error => {
      console.log(error)
      setMessageContent(`Error: ${error}`)
      setMessageType('error')
    })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const foundDuplicatedName = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase())
    if(foundDuplicatedName !== undefined) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
        const changedNumber = {...foundDuplicatedName, number: newNumber}
        phonebookServices
        .editPersonObj(foundDuplicatedName.id, changedNumber)
        .then(response => {
          setPersons(persons.map(n => n.id !== foundDuplicatedName.id ? n : response.data))
          setMessageContent(`${newName} number is updated!`)
          setMessageType('success')
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.message)
          setMessageContent(`Information of ${newName} has already been removed from server. Please refresh the browser.`)
          setMessageType('error')
        })
      }

      setTimeout(() => {
        setMessageContent(null)
      }, 5000)

      return
    }

    const nameObj = {
      name: newName,
      number: newNumber
    }

   phonebookServices
    .createPersonObj(nameObj)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setMessageContent(`${newName} is added!`)
      setMessageType('success')
    })
    .catch(error => {
      console.log(error.response.data.error)
      setMessageContent(error.response.data.error)
      setMessageType('error')
    })

    setTimeout(() => {
      setMessageContent(null)
    }, 5000)
    
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

  const toggleDelete = (id) => {
    const findPersonToDelete = persons.find(person => person.id === id)
    const namePersonToDelete = findPersonToDelete.name
    if(window.confirm(`Delete ${namePersonToDelete}?`)){
      phonebookServices
        .deletePersonObj(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
          setMessageContent(`Information of ${namePersonToDelete} has successfully been removed from server.`)
          setMessageType('success')
        })
        .catch(error => {
          console.log(error.message)
          setMessageContent(`Information of ${namePersonToDelete} has already been removed from server. Please refresh the browser.`)
          setMessageType('error')
        })
    }

    setTimeout(() => {
      setMessageContent(null)
    }, 5000)
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messageContent} type={messageType} />
      <FilterPerson filterName={filterName} handleFilterInput={handleFilterInput} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameInput={handleNameInput} newNumber={newNumber} handleNumberInput={handleNumberInput}/>
      <h3>Numbers</h3>
      <Persons filteredPerson={filteredPerson} persons={persons} filterName={filterName} toggleDelete={toggleDelete} />
    </div>
  )
}

export default App
