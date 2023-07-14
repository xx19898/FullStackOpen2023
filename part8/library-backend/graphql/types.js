
const typeDefs = `#graphql
  type JWT{
    token: String
  },
  type Status{
    status: String
  },
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
      addBook(
        title: String!,
        published: String!,
        author: String!,
        id: String!,
        genres: [String]!
        ): Book,
      editAuthor(name:String!,setBornTo: Int!): Author,
      login(username:String!,password:String!): JWT,
      signUp(username: String!, password: String!): Status,
  }
  type Query {
    bookCount: Int
    authorCount: Int
    totalAuthors: [Author]
    allBooks(genre:String): [Book]
    allAuthors(authorName:String): [AuthorWithBookCount]
  }
`;

module.exports = {typeDefs};
