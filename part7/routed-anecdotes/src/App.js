import { useState } from 'react'
import {
  Routes, Route, useMatch, useNavigate
} from 'react-router-dom'
import { useField } from './hooks'
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'


const CreateNew = (props) => {
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()
  const [content, resetContentField] = useField('content')
  const [author, resetAuthorField] = useField('author')
  const [info, resetInfoField] = useField('info')


  const handleSubmit = (e) => {
    e.preventDefault()
    if(e.type === 'submit') {
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      setNotification(`a new anecdote ${content.value} created`)
      setTimeout(() => {
        setNotification('')
        navigate('/')
      }, 5000)
  
    }
  
  }

  const resetForm = () => {
    resetContentField()
    resetAuthorField()
    resetInfoField()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Notification notification={notification} />
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={resetForm}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])



  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (anecdote) => {
    const anecdoteToVote = anecdoteById(anecdote.id)

    const voted = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === anecdote.id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null

  return (
      <>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} voteHandler={() => vote(anecdote)}/>} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
      </>
  )
}

export default App
