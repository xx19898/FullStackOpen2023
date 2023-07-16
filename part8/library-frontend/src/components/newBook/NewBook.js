import { useState } from 'react'
import './Newbook.css'
import { gql, useMutation } from '@apollo/client'


const ADD_NEW_BOOK = gql`
  mutation addBook(
    $title: String!,
    $published:Int!,
    $authorName: String!,
    $genres: [String]!
    ){
    addBook(title: $title, published: $published,
       authorName: $authorName, genres:$genres){
        title,
        published,
        author{
          name,
          born,
        }
        _id,
        genres,
       }
  }
`


function dec2hex (dec) {
  return dec.toString(16).padStart(2, "0")
}

function generateId (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}


const NewBook = () => {
  const [addBook,{data}] = useMutation(ADD_NEW_BOOK)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const submit = async (event) => {
    event.preventDefault()
    const randomId = generateId(10)
    addBook({
      variables:{
        title:title,
        authorName:author,
        published: parseInt(published),
        genres:genres,
        }})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form className="newbook-form" onSubmit={submit}>

          <label>title</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <label>author</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <label>published</label>
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
          <div className='add-genre-field'>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">Add genre</button>
          </div>
          <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook