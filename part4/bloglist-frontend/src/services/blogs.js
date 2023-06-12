import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: {Authorization: token},
  }
}

const createBlog = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {

  const response = await axios.get(baseUrl, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createBlog }