import { gql, useApolloClient, useQuery, useSubscription} from "@apollo/client"
import '../App.css'
import { useEffect, useState } from "react"


export const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  author{
    name
    born
  }
  _id
  genres
}`

export const ALL_BOOKS = gql`
  query($genre:String){
    allBooks(genre:$genre){
      ...BookDetails
  }
}

  fragment BookDetails on Book {
      title
      published
      author{
        name
        born
      }
      _id
      genres
  }


  `

export const BOOK_ADDED = gql`
  subscription {
    bookAdded{
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
  `




const BooksTable = ({books}) => {

  return(
    <>
    <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author name</th>
            <th>author birth date</th>
            <th>published</th>
            <th>genre</th>
          </tr>
          {books.map((a) => (
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.author.born}</td>
              <td>{a.published}</td>
              <td>{getGenresAsString(a)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  )

  function getGenresAsString(book){
    const genres = book.genres.reduce((acc,genre) => acc + `[${genre}]`,'')
    return genres;
  }
}

const Books = () => {
  const client = useApolloClient();
  const [chosenGenre,setChosenGenre] = useState(null);
  const cache = client.cache.readQuery({query:ALL_BOOKS,variables:{genre:chosenGenre}})
  const {data:booksData} = useQuery(ALL_BOOKS,{variables:{genre: chosenGenre},nextFetchPolicy:'cache-only'})
  useSubscription(BOOK_ADDED,{
    onData: ({data}) => {
        updateCache(client,ALL_BOOKS,data.data.bookAdded,chosenGenre)
        client.refetchQueries([ALL_BOOKS])
  }})

  if(booksData === undefined) return <p>Books loading</p>
  const allGenres = booksData.allBooks.reduce((acc,curr) => {

    curr.genres.forEach((genre) => {
      if(!acc.includes(genre)) acc.push(genre)
    })
    return acc
  },[])


  return (
    <div>
      <h2>books</h2>

      <BooksTable books={booksData.allBooks}/>
      <>
      {
        allGenres.map((genre) => {
          return <button key={genre} onClick={(e) => setChosenGenre(genre)}>{genre}</button>
        })
      }
      <button onClick={() => setChosenGenre('All')}>All</button>
      </>
    </div>
  )

  async function updateCache(client, query, addedBook,chosenGenre){
      const cache = await client.readQuery({query:query,})
      client.cache.updateQuery( {query:query,variables:{genre:chosenGenre}}, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
  }
}

export default Books
export {BooksTable}
