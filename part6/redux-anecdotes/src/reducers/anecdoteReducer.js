import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    toggleVoteAnecdote(state, action){
      const votedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== votedAnecdote.id ? anecdote: votedAnecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const {toggleVoteAnecdote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const increaseVoteAnecdote = (anecdoteObj) => {
  return async dispatch => {
    const votedAnecdote = {
      ...anecdoteObj,
      votes: anecdoteObj.votes + 1
    }
    const updatedAnecdote = await anecdoteService.updateVote(votedAnecdote)
    dispatch(toggleVoteAnecdote(updatedAnecdote))
  }
}
export default anecdoteSlice.reducer