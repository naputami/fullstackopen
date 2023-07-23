import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote= (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(newAnecdote(content))
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name='newAnecdote' /></div>
            <button type='submit'>create</button>
      </form>
    )
    
}
export default AnecdoteForm