import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateVote } from './request'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useNotifContent, useNotifDispatch } from './NotifContext'


const App = () => {
  const notifContent = useNotifContent()
  const notifDispatch = useNotifDispatch()

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

  const test = (anecdote) => {
    handleVote(anecdote)
    notifDispatch({type: 'SHOW_NOTIF', payload: `You voted ${anecdote.content}` })
    setTimeout(()=> {
      notifDispatch({type: 'REMOVE_NOTIF'})
    }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: false,
    refetchOnWindowFocus: false
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
      <Notification content={notifContent}/>
    
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => test(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
