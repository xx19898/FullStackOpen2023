const {comparePasswords, createJWTToken} = require('../auth/authUtility');
const {getPasswordByUsername, createNewUser} = require('../database/authRepository');
const {createNewAuthor} = require('../database/authorRepository');
const {createBook, getAllBooks} = require('../database/booksRepository');
const {authorizeUser} = require('./apiAuthorization');
const {GraphQLError} = require('graphql');

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    totalAuthors: () => authors,
    allBooks: async (root, {genre}) => {
      return await getAllBooks({genre: genre});
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
    addBook: async (
        root,
        {title, published, authorId, genres},
        contextValue) => {
      if (title.length < 5) {
        throw new GraphQLError(
            'title is too short, it has to be at least 5 chars long',
        );
      }
      authorizeUser(contextValue.authority);
      const createdUser = await createBook({
        title: title,
        published: published,
        authorId: authorId,
        genres: genres,
      });
      console.log({createdUser});
      return createdUser;
    },
    addAuthor: async (root, {name, born}, contextValue ) => {
      if (name.length < 4) {
        throw new GraphQLError('author name is too short');
      }
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
    signUp: async (root, {username, password}) => {
      return createNewUser({username, password});
    },
  },
};

module.exports = {resolvers};
