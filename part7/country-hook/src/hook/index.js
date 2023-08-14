import {useEffect, useState} from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    console.log(value)

    return {
        type,
        value,
        onChange
    }

}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    
    useEffect(()=> {
      const fetchCountry = async () => {
        try {
            const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            setCountry({...response.data, found: true})
        } catch(error) {
            setCountry({found: false})
        }
      }

      if(name){
        fetchCountry()
      }
    }, [name])

    return country
   
}