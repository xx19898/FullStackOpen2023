const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const {typeDefs} = require('./graphql/types');
const {resolvers} = require('./graphql/resolvers');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const {getScope} = require('./auth/authUtility');
const { connectDB } = require('./database/database');

require('dotenv').config();


const server = new ApolloServer({
  typeDefs,
  resolvers,
});


function startServer(port) {
  return startStandaloneServer(server, {
    listen: {port: 5000},
    context: ({req, res}) => ({
      authority: getScope(req),
    }),
  }).then(({url}) => {
    console.log(`Server ready at ${url}`);
  });
}

startServer(4000);
connectDB();

module.exports = {startServer};
