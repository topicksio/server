const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  enum Status {
    SEEN
    UNSEEN
  }

  type User {
    name: String
  }

  type SoloTopic {
    msg: String
    userId: String
    likes: Int
  }

  type Query {
    users: [User]
  }
  input UserInput {
    userIds: [UserTopics]
  }

  input UserTopics {
    name: String
  }

  input SoloTopics {
    msg: String
    userId: String
    likes: Int
  }

  type Mutation {
    addUser: [User]
  }

  # type Subscription {
  #   topicAdded: Topic
  # }
`;

const users = {
  lotso: {
    topics: [
      { topic: "gitjgojtre", from: "user1", likes: 501 },
      { topic: "gitjgojtre22", from: "user44", like: 654 },
    ],
  },
  trainwreckstv: {
    topics: [
      { topic: "gitjgojtre", from: "user1", like: 888 },
      { topic: "gitjgojtre22", from: "user44", like: 489 },
    ],
  },
};
