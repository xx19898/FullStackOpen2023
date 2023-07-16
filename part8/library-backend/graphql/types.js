
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
    _id:String,
  }
  type User{
    username: String,
    password: String,
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
    id:String,
  }
  type Mutation{
      addBook(
        title: String!,
        published: Int,
        authorId: String,
        genres: [String]
        ): Book,
      editAuthor(name:String!,setBornTo: Int!): Author,
      addAuthor(
        name:String!,
        born:Int,
      ) : Author,
      login(username:String!,password:String!): JWT,
      signUp(username: String!, password: String!,favoriteGenre: String): User,
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
