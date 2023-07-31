import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createAnecdote= async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

export const updateVote = async anecdoteObj => {
    const response = await axios.put(`${baseUrl}/${anecdoteObj.id}`, anecdoteObj)
    return response.data
}