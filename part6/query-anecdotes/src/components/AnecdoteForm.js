import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../request"
const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const newAnecdoteMutation = new useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteObj = {
      content,
      vote: 0
    }
    newAnecdoteMutation.mutate(anecdoteObj)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
