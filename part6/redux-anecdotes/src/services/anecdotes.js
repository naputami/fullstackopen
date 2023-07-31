/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}
const updateVote = async anecdoteObj => {
  const response = await axios.put(`${baseUrl}/${anecdoteObj.id}`, anecdoteObj)
  return response.data
}
export default { getAll, createNew, updateVote }
