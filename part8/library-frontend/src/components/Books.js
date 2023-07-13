import { gql, useQuery } from "@apollo/client"

const ALL_AUTHORS = gql`
  query {
    allBooks{
      title
      published
      author
      id
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
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
