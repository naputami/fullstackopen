import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateVote } from './request'
import { useQuery, useQueryClient, useMutation } from 'react-query'

const App = () => {

  const queryClient = useQueryClient()

  const updateVoteMutation = useMutation(updateVote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    },
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateVoteMutation.mutate(updatedAnecdote)
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return (
      <div>Anecdotes service is not available due to internal server error</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
