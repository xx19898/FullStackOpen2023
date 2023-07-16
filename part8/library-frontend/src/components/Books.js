import { gql, useQuery } from "@apollo/client"
import '../App.css'

export const ALL_AUTHORS = gql`
  query {
    allBooks{
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

const Books = () => {
  const {data} = useQuery(ALL_AUTHORS)

  if(data === undefined) return <p>Books loading</p>

  const books = data.allBooks

  console.log({books})

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>author name</th>
            <th>author birth date</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.author.born}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
