import { useDispatch, useSelector } from "react-redux"
import { createVoteAction } from "./reducers/anecdoteReducer"


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const vote = (anecdote) => {
        dispatch(createVoteAction(anecdote))
    }

    return(
        <>
        {anecdotes.sort(function(a,b){return a.votes - b.votes}).map(anecdote =>
            <div key={anecdote.id} style={{marginTop:'2em',marginBottom:'1em'}}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
        )}
        </>
    )
}

export default AnecdoteList