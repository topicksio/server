const { ApolloServer, gql } = require("apollo-server");


const typeDefs = gql`
  type Topic {
    msg: String
    from: String
    likes: Int
  }

  type Query {
    topics: [Topic]
  }
`;

const topics = [
  {
    msg: "this is a topic",
    from: "jean",
    likes: 5,
  },
  {
    msg: "this is a topic 2222",
    from: "nol",
    likes: 2,
  },
];

const resolvers = {
  Query: {
    topics: () => {
      return topics;
    },
  },
};



const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`)
});


// Socket.io
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("topic", (topic) => {
//     console.log(`topic: ${JSON.stringify(topic)}`);
//     io.emit("topic", topic);
//   });
// });