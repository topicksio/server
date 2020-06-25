const { ApolloServer } = require("apollo-server");
const color = require("colors");
const mongoose = require("mongoose");
const resolvers = require("./resolvers/resolvers");
const typeDefs = require("./schemas/typeDefs");
require("dotenv").config();
const uristring = process.env.MONGO_URI;

mongoose.connect(uristring, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});


const db = mongoose.connection;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //Add context like usernames and 0authentication. passes through resolvers as context etc....
  context: ({ req }) => {
    const fakeUser = {
      userId: "lotso1",
    };
    return {
      ...fakeUser,
    };
  },
  introspection: true,
  playground: true,
});

// server.applyMiddleware({ });

db.on("error", console.error.bind(console, "connection error:".bgRed));
db.once("open", function () {
  console.log("✅ db connected ✅".rainbow);
  server
    .listen({
      port: process.env.PORT || 5000,
    })
    .then(({ url }) => {
      console.log(`Server started at ${url}`);
    });
});
