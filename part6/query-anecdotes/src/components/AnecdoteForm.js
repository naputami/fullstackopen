import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../request"
import { useNotifDispatch } from "../NotifContext"

const AnecdoteForm = () => {
  const notifDispatch = useNotifDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = new useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      notifDispatch({type: 'SHOW_NOTIF', payload: `${newAnecdote.content} is successfully added`})
      setTimeout(()=> {
        notifDispatch({type: 'REMOVE_NOTIF'})
      }, 5000)
    },
    onError: () => {
      notifDispatch({type: 'SHOW_NOTIF', payload: 'Too short anecdote, must have 5 characters length or more'})
      setTimeout(()=> {
        notifDispatch({type: 'REMOVE_NOTIF'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteObj = {
      content,
      votes: 0
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
