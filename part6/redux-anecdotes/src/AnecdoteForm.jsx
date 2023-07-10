import { useDispatch } from "react-redux"
import { createNewAnecdoteThunk } from "./slices/anecdoteSlice"
import { useState } from "react"
import axios from "axios"
import { asObject } from "./slices/anecdoteSlice"


const AnecdoteForm = () => {
    const dispatch = useDispatch()


    return(
        <>
        <h2>create new</h2>
        <form onSubmit={async (e) => {
            e.preventDefault()
            const anecdote = e.target.anecdote.value    
            e.target.anecdote.value = ''
            dispatch(createNewAnecdoteThunk(anecdote))
          }}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
        </>
    )
}

export default AnecdoteForm


export async function createNewAnecdote(anecdoteContent){
    const response = await axios.post('http://localhost:3001/anecdotes',asObject(anecdoteContent))
}