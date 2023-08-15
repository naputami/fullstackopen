const Anecdote = ({anecdote, voteHandler}) => (
    <div>
      <h3>{anecdote.content} by {anecdote.author}</h3>
      <p>has {anecdote.votes}</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      <button type='button' onClick={voteHandler}>vote</button>
    </div>
)

export default Anecdote