import { useState } from 'react'
import './App.css'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  function getRandomAnecdoteIndex(){
    return Math.floor(Math.random() * anecdotes.length)

  }

  const initialValue = []

  for(let i = 0; i < anecdotes.length; i++){
    initialValue.push(0)
  }

  const [votesObject,setVotesObject] = useState(initialValue)

  const [selected, setSelected] = useState(0)

  let mostPopularAnecdote = 0
  
  votesObject.forEach( (numberVotes,index) => {
    if(numberVotes > votesObject[mostPopularAnecdote]) mostPopularAnecdote = index
  })

  function vote(){
    const newVotesObject = [...votesObject]
    newVotesObject[selected] = newVotesObject[selected] + 1
    setVotesObject(newVotesObject)
  }

  return(
    <div className='main'>
      <button onClick={() => setSelected(getRandomAnecdoteIndex())}>Set random anecdote</button>
      <button onClick={() => vote()}>Vote</button>
      {anecdotes[selected]}
      <p>Votes on current anecdote <strong>{votesObject[selected]}</strong></p>
      <p>Most popular anecdote:</p>
      <p>{anecdotes[mostPopularAnecdote]}</p>
    </div>
  )
}

export default App
