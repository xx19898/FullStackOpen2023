const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const {typeDefs} = require('./graphql/types');
const {resolvers} = require('./graphql/resolvers');

const {GraphQLError} = require('graphql');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const {getScope} = require('./auth/authUtility');
const {connectDB} = require('./database/database');
const {expressMiddleware} = require('@apollo/server/express4');
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const express = require('express');
const cors = require('cors');
const http = require('http');
const {WebSocketServer} = require('ws');
const {useServer} = require('graphql-ws/lib/use/ws');

require('dotenv').config();



const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });
  const schema = makeExecutableSchema({typeDefs, resolvers});
  const serverCleanup = useServer({schema}, wsServer);

  const server = new ApolloServer({
    schema, plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ]});

  await server.start();
  app.use('/',
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({req}) => ({
          authority: getScope(req),
        }),
      }));
  const PORT = 5000;
  httpServer.listen(PORT, () => console.log(
      `Server is now running on http://localhost:${PORT}`,
  ),
  );
};

start();

connectDB();
