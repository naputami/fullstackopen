import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
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

const updateBlog = async (blogObj) => {
  const response = await axios.put(`${baseUrl}/${blogObj.id}`, blogObj, config)
  return response.data
}

const deleteBlog = async (blogObj) => {
  const response = await axios.delete(`${baseUrl}/${blogObj.id}`, config)
  return response.data
}

export default { getAll, setToken, createBlog, updateBlog, deleteBlog }