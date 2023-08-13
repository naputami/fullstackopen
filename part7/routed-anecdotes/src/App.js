import { useState } from 'react'
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import { useField } from './hooks'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  
  return (
    <div>
        <Link to='/' style={padding}>Anecdotes</Link>
        <Link to='/create' style={padding}>Create New</Link>
        <Link to='/about' style={padding}>About</Link>
      </div>
  )
}

const Anecdote = ({anecdote, voteHandler}) => (
  <div>
    <h3>{anecdote.content} by {anecdote.author}</h3>
    <p>has {anecdote.votes}</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    <button type='button' onClick={voteHandler}>vote</button>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Notification = ({notification}) => {
  if(notification === ''){
    return null
  }

  return (
    <>
      <p>{notification}</p>
    </>
  )
}

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
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
