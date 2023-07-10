import { createSlice } from "@reduxjs/toolkit"
import { fetchAnecdotes } from "../App"
import { createNewAnecdote } from "../AnecdoteForm"
import axios from "axios"
import { setNotificationThunk } from "./notificationSlice"


const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []


export const anecdoteSlice = createSlice({
  name:'anecdote',
  initialState,
  reducers:{
      voteAnecdote(state,action){
          state.find((anecdote) => anecdote.id === action.payload).votes++
      },
      setAnecdotes(state,action){
        return action.payload
      }
  }
})

export const fetchAnecdotesThunk = () => {
  return async dispatch => {
    const anecdotes = await fetchAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdoteThunk = (anecdoteText) => {
  return async dispatch => {
    await createNewAnecdote(anecdoteText)
    dispatch(fetchAnecdotesThunk())
  }
}

export const voteAnecdoteThunk = (anecdote) => {
  return async dispatch => {
    await voteAnecdoteApiCall(anecdote)
    dispatch(fetchAnecdotesThunk())
    dispatch(setNotificationThunk(`You voted for ${anecdote.content}`,5000))
  }
}

async function voteAnecdoteApiCall(anecdote){
    const updatedVotes = anecdote.votes + 1
    const updatedAnecdote = {...anecdote,votes:updatedVotes}
    const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`,updatedAnecdote)
}

export const {voteAnecdote,setAnecdotes} = anecdoteSlice.actions

export const anecdoteReducer = anecdoteSlice.reducer

