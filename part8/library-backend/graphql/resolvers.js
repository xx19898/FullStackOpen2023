const {comparePasswords, createJWTToken} = require('../auth/authUtility');
const {getPasswordByUsername} = require('../database/authRepository');
const {createNewAuthor} = require('../database/authorRepository');
const {authorizeUser} = require('./apiAuthorization');
const {GraphQLError} = require('graphql');

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    totalAuthors: () => authors,
    allBooks: (root, {genre}) => {
      return !genre ? books : books.filter((book) => {
        return book.genres.some((booksGenre) => booksGenre === genre);
      });
    },
    allAuthors: (root, {authorName}) => {
      console.log({authorName});
      const soughtAuthors = authorName ? [authors.find((author) => author.name = authorName)] : authors;
      console.log({soughtAuthors});
      return soughtAuthors.map((author) => {
        const authorName = author.name;
        const born = author.born;
        const id = author.id;
        const count = books.reduce((accumulator, currentBook) => {
          if (currentBook.author === authorName) {
            return accumulator + 1;
          } else {
            return accumulator;
          }
        }, 0);

        return {
          name: authorName,
          bookCount: count,
          born: born,
          id: id,
        };
      });
    }},
  Mutation: {
    addBook: (root, {title, published, author, id, genres}) => {
      const newBook = {title, published, author, id, genres};
      if (!authors.some((author) => author.name === author)) {
        authors = authors.concat({name: author});
      }
      books = books.concat(newBook);
      return newBook;
    },
    addAuthor: async (root, {name, born}, contextValue ) => {
      console.log('got to resolver');
      console.log({name, born});
      console.log({contextValue});
      authorizeUser(contextValue.authority);
      return await createNewAuthor({name, born});
    },
    editAuthor: (root, {name, setBornTo}) => {
      const authorToUpdate = authors.find((author) => author.name === name);
      if (authorToUpdate) {
        const updatedAuthors = authors.map((author) => {
          if (author.name !== authorToUpdate.name) return author;
          else return {...author, born: setBornTo};
        });
        authors = updatedAuthors;
        const updatedAuthor = authors.find((author) => author.name === name);
        return updatedAuthor;
      } else {
        return {};
      }
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
      return {token: jwtToken};
    },
  },
};

module.exports = {resolvers};
