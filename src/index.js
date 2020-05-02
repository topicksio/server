const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const resolvers = require('../resolvers/resolvers')
const typeDefs = require('../schemas/typeDefs')
require("dotenv").config();

const db = mongoose.connection;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const server = new ApolloServer({
  typeDefs,
  resolvers,
  //Add context like usernames and authentication. passes through resolvers as context etc....
  context: ({ req }) => {
    const fakeUser = {
      userId: "helloImaUser",
    };
    return {
      ...fakeUser,
    };
  },
  introspection: true,
  playground: {
    endpoint: '/graphql',
  },
});

server.applyMiddleware({ app });

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected");
  app.listen(
    {
      port: process.env.PORT || 5000,
    },
    () => console.log(`Server started at http://localhost:${process.env.PORT}`)
  );
});
