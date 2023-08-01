import { useDispatch, useSelector } from "react-redux";
import { increaseVoteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";


const Anecdote = ({anecdote, voteHandler}) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={voteHandler}>vote</button>
            </div>
      </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const voteHandler = (anecdote) => {
        dispatch(increaseVoteAnecdote(anecdote))
        dispatch(showNotification(`You voted ${anecdote.content}`, 5))
    }

    const anecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes
        .filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
        .sort((a, b) => b.votes - a.votes)
    })

    return (
        <>
            {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={() => voteHandler(anecdote)} />)}
        </>
    )
}

export default AnecdoteList