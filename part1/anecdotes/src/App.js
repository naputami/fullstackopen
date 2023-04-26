import { useState } from 'react'

const Title = ({text}) => <h2>{text}</h2>

const Anecdote = ({anecdote, vote}) => <div><p>{anecdote}</p><p>has {vote} {vote < 2 ? 'vote': 'votes'}</p></div>

const AnecdoteWithMostVoted = ({anecdotes, votes}) => {
  if(Math.max(...votes) === 0){
    return (
      <div>
        <p>There's no data vote recorded</p>
      </div>
    )
  }

  return (
    <div>
      <p>{anecdoteWithLargestPoint(votes, anecdotes)}</p>
      <p>has {largestPoint(votes)} {largestPoint(votes) < 2 ? 'vote': 'votes'}</p>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const largestPoint = (points) => Math.max(...points)


const anecdoteWithLargestPoint = (points, anecdotes) => {
  const indexLargestPoint = points.indexOf(Math.max(...points))
  return anecdotes[indexLargestPoint]
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, seVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNextClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
    console.log(randomIndex)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    seVotes(newVotes)
    console.log(newVotes)
  }

  return (
    <div>
      <Title text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button handleClick={handleVoteClick} text='vote'/>
      <Button handleClick={handleNextClick} text='next anecdote'/>
      <Title text='Anecdote with most vote' />
      <AnecdoteWithMostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
