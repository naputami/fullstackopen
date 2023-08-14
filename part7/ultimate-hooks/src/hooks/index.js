import { useState, useEffect } from 'react'
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResource = async () => {

        try {

            const response = await axios.get(baseUrl)
            setResources([...response.data])
     
        } catch(error) {
            console.log(error.message)
        }
    }
   
    if(resources){
        fetchResource()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl])

  const create = async (resource) => {
    try {
        const response = await axios.post(baseUrl, resource)
        setResources([...resources, response.data])
    } catch(error) {
        console.log(error)
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}