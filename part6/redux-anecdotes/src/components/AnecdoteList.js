import { useDispatch, useSelector } from "react-redux";
import { toggleVoteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";


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
    const test = (anecdote) => {
        dispatch(toggleVoteAnecdote(anecdote))
        dispatch(setNotification(anecdote))
    }

    const anecdotes = useSelector(({anecdotes, filter}) => {
        if(filter === ''){
            return anecdotes
        }

        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    return (
        <>
            {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={() => test(anecdote)} />)}
        </>
    )
}

export default AnecdoteList