const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Author = require('./database/AuthorSchema');
const Book = require('./database/BookSchema');

require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;

console.log('connecting to', MONGODB_URL);

mongoose.connect(MONGODB_URL).then(() => {
  console.log('connected to MongoDB');
}).catch((e) => {
  console.log('Error connecting to MongoDB: ', e.message);
});


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: {port: 4000},
  context: async ({req, res}) => ({
    authority: getScope(req),
  }),
}).then(({url}) => {
  console.log(`Server ready at ${url}`);
});
