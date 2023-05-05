import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountries from './components/FindCountries'
import ContentCountries from './components/ContentCountries'


const App = () => {
  const [keyword, setKeyword] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => console.log(error.message))
  }, [])

  const handleSearchCountry = (event) => {
    setKeyword(event.target.value)
  }

  const filteredCountry = () => {
    if(keyword === '' ) {
      return []
    }

    return countries.filter(country => country.name.common.toLowerCase().includes(keyword.toLowerCase()))}
  
  return (
    <>
    <FindCountries keyword={keyword} handleFindCountries={handleSearchCountry}/>
    <ContentCountries countries={filteredCountry()} />
    </>
  )
}
export default App;
