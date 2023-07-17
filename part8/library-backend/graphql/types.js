
const typeDefs = `#graphql
  type LoginResponse{
    token: String,
    favoriteGenre: String,
  },
  type Status{
    status: String
  },
  type Author{
    born:Int,
    name:String,
    _id:String,
  }
  type User{
    username: String,
    password: String,
    favoriteGenre: String,
    _id: String,
  }
  type Book {
    title: String!,
    published: String,
    author: Author,
    _id: String,
    genres:[String]!
  }
  type AuthorWithBookCount{
    name: String,
    bookCount: Int,
    born: Int,
    _id:String,
  }
  type Mutation{
      addBook(
        title: String!,
        published: Int,
        authorName: String,
        genres: [String]
        ): Book,
      editAuthor(name:String!,setBornTo: Int!): Author,
      addAuthor(
        name:String!,
        born:Int,
      ) : Author,
      login(username:String!,password:String!): LoginResponse,
      signUp(username: String!, password: String!,favoriteGenre: String): User,
  }
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(genre:String): [Book]
    allAuthors(authorName:String): [AuthorWithBookCount]
  }
`;

module.exports = {typeDefs};
