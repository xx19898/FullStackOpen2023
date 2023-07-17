const {comparePasswords, createJWTToken} = require('../auth/authUtility');
const { Author } = require('../database/AuthorSchema');
const {getPasswordByUsername, createNewUser, getUserByUsername} = require('../database/authRepository');
const {createNewAuthor, updateAuthor, getAllAuthors} = require('../database/authorRepository');
const {createBook, getAllBooks} = require('../database/booksRepository');
const {authorizeUser} = require('./apiAuthorization');
const {GraphQLError} = require('graphql');

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await getAllBooks();
      return books.length;
    },
    authorCount: async () => {
      const authors = await getAllAuthors();
      return authors.length;
    },
    allBooks: async (root, {genre}) => {
      console.log({genre});
      if(genre === 'All') return await getAllBooks();
      return await getAllBooks(genre);
    },
    allAuthors: async (root, {authorName}) => {
      console.log({authorName});
      const authors = await getAllAuthors();
      const soughtAuthors = authorName ?
      [authors.find((author) => author.name = authorName)] : authors;
      const books = await getAllBooks();
      return soughtAuthors.map((author) => {
        const authorName = author.name;
        const born = author.born;
        const _id = author._id;
        const count = books.reduce((accumulator, currentBook) => {
          if (currentBook.author.name === authorName) {
            return accumulator + 1;
          } else {
            return accumulator;
          }
        }, 0);

        return {
          name: authorName,
          bookCount: count,
          born: born,
          _id: _id,
        };
      });
    }},
  Mutation: {
    addBook: async (
        root,
        {title, published, authorName, genres},
        contextValue) => {
      if (title.length < 5) {
        throw new GraphQLError(
            'title is too short, it has to be at least 5 chars long',
        );
      }
      authorizeUser(contextValue.authority);
      const createdBook = await createBook({
        title: title,
        published: published,
        authorName: authorName,
        genres: genres,
      });
      console.log({createdBook});
      return createdBook;
    },
    addAuthor: async (root, {name, born}, contextValue ) => {
      if (name.length < 4) {
        throw new GraphQLError('author name is too short');
      }
      authorizeUser(contextValue.authority);
      return await createNewAuthor({name, born});
    },
    editAuthor: async (root, {name, setBornTo}, contextValue) => {
      authorizeUser(contextValue.authority);
      const user = await Author.findOne({name: name});
      console.log({user, setBornTo});
      return updateAuthor(user, setBornTo);
    },
    login: async (root, {username, password}) => {
      const hashedPassword = await getPasswordByUsername({username: username});
      const payload = comparePasswords(password, hashedPassword);
      if (payload === undefined) {
        throw new GraphQlError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      };
      const jwtToken = await createJWTToken(username);
      const user = await getUserByUsername({username: username});
      return {token: jwtToken, favoriteGenre: user.favoriteGenre};
    },
    signUp: async (root, {username, password, favoriteGenre}) => {
      return createNewUser({username, password, favoriteGenre});
    },
  },
};

module.exports = {resolvers};
