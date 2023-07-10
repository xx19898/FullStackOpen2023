
import AnecdoteFilter from './AnecdoteFilter'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'

const App = () => {

  return (
    <div>
      <h2>Anecdote Filter</h2>
      <AnecdoteFilter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App