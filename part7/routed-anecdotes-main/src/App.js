import { useEffect, useState } from 'react'
import {Route, BrowserRouter as Router, Routes, useNavigate, useParams} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='/anecdotes' style={padding}>anecdotes</a>
      <a href='/createNew' style={padding}>create new</a>
      <a href='/about' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate()
  
  const {reset:contentReset,type:contentType,value:contentValue,onChange:contentOnChange} = useField('text')
  const {reset:authorReset,type:authorType,value:authorValue,onChange:authorOnChange} = useField('text')
  const {reset:infoReset,type:infoType,value:infoValue,onChange:infoOnChange} = useField('text')

  const handleReset = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  const handleSubmit = () => {
    props.addNew({
      contentValue,
      authorValue,
      infoValue,
      votes: 0
    })
    navigate('/anecdotes')
  }
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          content
          <input name='content' type={contentType} value={contentValue} onChange={(e) => contentOnChange(e)} />
        </div>
        <div>
          author
          <input name='author' type={authorType} value={authorValue} onChange={(e) => authorOnChange(e)} />
        </div>
        <div>
          url for more info
          <input name='info' type={infoType} value={infoValue} onChange={(e)=> infoOnChange(e)} />
        </div>
        <button onClick={(e) => handleSubmit()}>create</button>
        <button onClick={(e) => handleReset()}>reset</button>
      </form>
    </div>
  )

}

const Anecdote = ({anecdotes}) => {
    const params = useParams()
    const anecdote = anecdotes[params.index]
    console.log({index:anecdote})
    return(
      <p><strong>{anecdote.content}</strong></p>
    )
}

const App = () => {
  const [notification, setNotification] = useState('')
  useEffect(() => {
    let timeout
    if(notification != ''){
        timeout = setTimeout(() => setNotification(''),5000)
    }
    return () => clearTimeout(timeout)
  },[notification])
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`Added new anecdote: ${anecdote.content}`)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
    <div>
      {notification !== '' ? <p><strong>{notification}</strong></p> : null}
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/anecdotes/:index" element={<Anecdote anecdotes={anecdotes}/>} />
        <Route path="/createNew" element={<CreateNew addNew={addNew}/>} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  )
}

export default App
