const { gql, useQuery } = require("@apollo/client")
const { BooksTable } = require("../Books")


const recBooksQuery = gql`
query ($genre: String){
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

const RecommendedBooks = () => {
    const favoriteGenre = extractFavGenre()
    console.log({favoriteGenre})
    const {data:recBooks} = useQuery(recBooksQuery,{variables:{genre:favoriteGenre}})
    console.log({recBooks});
    return(
        <div>
            {
                recBooks ? <BooksTable books={recBooks.allBooks} /> : <p>Sorry, but you havent given us your favourite genre yet :/</p>
            }
        </div>
    )
}


function extractFavGenre(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    return userInfo.favoriteGenre
}


export default RecommendedBooks