import { useDispatch, useSelector } from "react-redux";
import { toggleVote } from "../reducers/anecdoteReducer";

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
    const anecdotes = useSelector(state => state)

    return (
        <>
            {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={() => dispatch(toggleVote(anecdote.id))} />)}
        </>
    )
}

export default AnecdoteList