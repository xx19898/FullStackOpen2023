const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
  type Author{
    born:Int,
    name:String,
    id:String,
  }
  type Book {
    title: String,
    published: Int,
    author: String,
    id: String,
    genres:[String]
  }
  type AuthorWithBookCount{
    name: String,
    bookCount: Int,
    born: Int,
    id:String,
  }
  type Mutation{                  
      addBook(title: String!,published: String!,author: String!,id: String!,genres: [String]!): Book,

      editAuthor(name:String!,setBornTo: Int!): Author
  }
  type Query {
    bookCount: Int
    authorCount: Int
    totalAuthors: [Author]
    allBooks(genre:String): [Book]
    allAuthors(authorName:String): [AuthorWithBookCount]
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    totalAuthors: () => authors,
    allBooks: (root,{genre}) => {
      return !genre ? books : books.filter((book) =>  {
        return book.genres.some((booksGenre) => booksGenre === genre)
      })},
    allAuthors: (root,{authorName}) => {
      console.log({authorName})
      const soughtAuthors = authorName ? [authors.find((author) => author.name = authorName)] : authors
      console.log({soughtAuthors})
      return soughtAuthors.map(author => {
      const authorName = author.name
      const born = author.born
      const id = author.id
      const count = books.reduce((accumulator,currentBook) => {
        if(currentBook.author === authorName){
          return accumulator + 1
        }else{
          return accumulator
        }
      },0)

      return {
        name:authorName,
        bookCount:count,
        born:born,
        id:id,
      }
    })
  }},
  Mutation:{
    addBook: (root,{title,published,author,id,genres}) => {
      const newBook = {title,published,author,id,genres}
      if(!authors.some((author) => author.name === author)) authors = authors.concat({name:author})
      books = books.concat(newBook)
      return newBook;
    },
    editAuthor: (root,{name,setBornTo}) => {
      const authorToUpdate = authors.find((author) => author.name === name)
      if(authorToUpdate){
        const updatedAuthors = authors.map((author) => {
          if(author.name !== authorToUpdate.name) return author
          else return {...author,born:setBornTo}
          })
        authors = updatedAuthors
        console.log({updatedAuthors})
        const updatedAuthor = authors.find((author) => author.name === name)
        return updatedAuthor
      }else{
        return {}
      }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
