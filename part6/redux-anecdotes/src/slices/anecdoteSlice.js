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



export const {voteAnecdote,setAnecdotes} = anecdoteSlice.actions

export const anecdoteReducer = anecdoteSlice.reducer

