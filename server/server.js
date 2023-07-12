// TODO: Implement the Apollo Server and apply it to the Express server as middleware
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Require Apollo Server and typeDefs/Resolvers to be used
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');


const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// applying apollo server as middleware to the express app
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({app});

  db.once('open', () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Calling the async function to start the server
startApolloServer();




