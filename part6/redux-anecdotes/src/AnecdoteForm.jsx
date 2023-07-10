import { useDispatch } from "react-redux"
import axios from "axios"
import { asObject } from "./slices/anecdoteSlice"
import { useMutation } from "react-query"
import { queryClient } from "."
import { useContext } from "react"
import { NotificationContext } from "./App"


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const [notificationState,notificationDispatch] = useContext(NotificationContext)
    const mutation = useMutation(createNewAnecdote,{
        onError: (error,query) => {
            notificationDispatch({type:'ERROR',payload:{message: `Error, when trying to create new anecdote. Remember, it's gotta be at least 5 chars long :)`}})
        },
        onSuccess: (data,newAnecdote) => {
            queryClient.invalidateQueries('anecdotes')
            notificationDispatch({type:'SUCCESS',payload:{message:`Created new anecdote: ${newAnecdote.anecdote}`}})
        },
    })

    return(
        <>
        <h2>create new</h2>
        <form onSubmit={async (e) => {
            e.preventDefault()
            const anecdote = e.target.anecdote.value    
            e.target.anecdote.value = ''
            mutation.mutate({
                anecdote
            })
          }}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
        </>
    )
}

export default AnecdoteForm


export function createNewAnecdote({anecdote}){
    if(anecdote.length < 5) throw new Error("error") //Simulating error trown by json-server as i for some reason don't get errors from json-server if anecdote is shorter than 5 chars
    return axios.post('http://localhost:3001/anecdotes',asObject(anecdote))
}