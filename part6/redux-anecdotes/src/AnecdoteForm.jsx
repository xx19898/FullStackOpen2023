import { useDispatch } from "react-redux"
import { createNewAnecdoteAction } from "./reducers/anecdoteReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    return(
        <>
        <h2>create new</h2>
        <form onSubmit={(e) => {
            e.preventDefault()
            const anecdote = e.target.anecdote.value    
            e.target.anecdote.value = ''
            dispatch(createNewAnecdoteAction(anecdote))
          }}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
        </>
    )
}

export default AnecdoteForm