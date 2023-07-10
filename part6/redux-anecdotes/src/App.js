
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteFilter from './AnecdoteFilter'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Notification from './components/Notification'
import axios from 'axios'
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
        return {message: action.payload.message,color:'pink',status:'ERROR'}
    case "SUCCESS":
        return {message:action.payload.message,color:'green',status:'SUCCESS'}
    case "NONE":
        return {message:'',color:'',status:'NONE'}
    case "UPDATE_TIMEOUT_OBJ":
        return {...state,timeoutId:action.payload.timeoutId}
    default:
        return state
  }
}

export const NotificationContext = createContext()

const App = () => {
  
  const [notification,notificationDispatch] = useReducer(notificationReducer, {message:'',color:'',status:'NONE',timeoutId:null})
  
  return (
    <NotificationContext.Provider value={[notification,notificationDispatch]}>
    <div>
      {
        notification.status !== 'NONE' ? <Notification/> : null
      }
      <h2>Anecdote Filter</h2>
      <AnecdoteFilter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
    </NotificationContext.Provider>
  )

  
}

export default App

export async function fetchAnecdotesApiCall(){
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

export async function voteAnecdoteApiCall(anecdote){
  const updatedVotes = anecdote.votes + 1
  const updatedAnecdote = {...anecdote,votes:updatedVotes}
  const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`,updatedAnecdote)
}