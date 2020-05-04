const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  enum Status {
    SEEN
    UNSEEN
  }

  type User {
    id: ID!
    name: String!
    topPoints: Int
  }

  type Topic {
    id: ID!
    msg: String!
    date: Date
    likes: Int
    status: Status
    user: [User]
  }

  type Query {
    topics: [Topic]
    topic(id: ID): Topic
  }

  input UserInput {
    id: ID
    name: String
    topPoints: Int
  }

  input TopicInput {
    id: ID
    msg: String
    date: Date
    likes: Int
    status: Status
    user: [UserInput]
  }

  type Mutation {
    addTopic(topic: TopicInput): [Topic]
  }
`;
