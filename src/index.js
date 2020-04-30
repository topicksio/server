const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  enum Status {
    SEEN
    UNSEEN
  }

  type User {
    id: ID!
    name: String!
  }

  type Topic {
    id: ID!
    msg: String!
    likes: Int!
    status: Status
    user: User!
  }

  type Query {
    topics: [Topic]
    topic(id: ID): Topic
  }
`;

const topics = [
  {
    id: 44444,
    msg: "this is a topic",
    likes: 5,
    user: {
      name: "jean",
    },
  },
  {
    id: 44455,
    msg: "this is a topic 2222",
    user: {
      name: "nol",
    },

    likes: 2,
  },
];

const resolvers = {
  Query: {
    topics: () => {
      return topics;
    },
    topic: () => {
      return topics[0]
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});

// Socket.io
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("topic", (topic) => {
//     console.log(`topic: ${JSON.stringify(topic)}`);
//     io.emit("topic", topic);
//   });
// });
