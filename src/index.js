require("module-alias/register");

const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require('graphql-upload');
const express = require('express');
const { port, path, environment } = require("@config/index");

const executableSchema = require('./schema');
const cookieParser = require('cookie-parser')
const auth = require('./services/middleware/auth');

const startServer = async () => {
  const mocks = {
    Date: () => {
      return new Date();
    },
  };

  let mocksActive = false;
  if (environment == 'dev') {
    mocksActive = true
  }

  const server = new ApolloServer({
    schema: executableSchema,
    uploads: false,
    mocks: mocksActive,
    playground: true, 
    mockEntireSchema: false,
    context: ({ req, res }) => ({ req, res })
  });

  const app = express();
  app.use(cookieParser());
  app.use(graphqlUploadExpress());
  app.use(auth);

  server.applyMiddleware({ app, path });

  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:` + port + path);
  });
};

startServer();
