import { gql, useQuery } from "@apollo/client"
import '../App.css'
import { useState } from "react"

export const ALL_BOOKS = gql`
  query($genre:String){
    allBooks(genre:$genre){
      title
      published
      author{
        name
        born
      }
      _id
      genres
    }
  }`




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
  const [chosenGenre,setChosenGenre] = useState(null);
  const {data:booksData} = useQuery(ALL_BOOKS,{variables:{genre: chosenGenre}})
  const {data: genresData} = useQuery(ALL_BOOKS)

  if(booksData === undefined || genresData === undefined) return <p>Books loading</p>
  console.log({books:booksData.allBooks})
  console.log({genresData})
  const allGenres = genresData.allBooks.reduce((acc,curr) => {

    curr.genres.forEach((genre) => {
      if(!acc.includes(genre)) acc.push(genre)
    })
    return acc
  },[])

  console.log({allGenres})

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
}

export default Books
export {BooksTable}
