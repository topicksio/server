const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const http = require('http')
const app = express();
const mongoose = require("mongoose");
const resolvers = require("./resolvers/resolvers");
const typeDefs = require("./schemas/typeDefs");
require("dotenv").config();
const uristring = process.env.MONGO_URI


mongoose.connect(
  uristring,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, res) {
    if (err) {
      console.log("ERROR connecting to: " + process.env.MONGO_URI + ". " + err);
    } else {
      console.log("Succeeded connected to: " + process.env.MONGO_URI);
    }
  }
);

const db = mongoose.connection;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //Add context like usernames and 0authentication. passes through resolvers as context etc....
  context: ({ req }) => {
    const fakeUser = {
      userId: "helloImaUser",
    };
    return {
      ...fakeUser,
    };
  },
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });



db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected");
  app.listen(
    {
      port: process.env.PORT || 5000,
    },
    () => {
      console.log(`Server started at http://localhost:${process.env.PORT}`);
    }
  );
});
