
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteFilter from './AnecdoteFilter'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Notification from './components/Notification'
import { useEffect } from 'react'
import axios from "axios"
import { fetchAnecdotesThunk, setAnecdotes } from './slices/anecdoteSlice'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchAnecdotesThunk())
  },[])
  
  const {notificationStatus,notificationMessage} = useSelector(state => state.notification)
  
  return (
    <div>
      {
        notificationStatus ? <Notification notificationMessage={notificationMessage}/> : null
      }
      <h2>Anecdote Filter</h2>
      <AnecdoteFilter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )

  
}

export default App

export async function fetchAnecdotes(){
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}