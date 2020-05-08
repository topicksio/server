const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  enum Status {
    SEEN
    UNSEEN
  }

  type User {
    id: ID
    userId: String
    topics: [SoloTopic]
  }

  type SoloTopic {
    id: ID
    topic: String
    from: String
    likes: Int
  }

  type Query {
    users: [User]
    user(id: String): User
    topic(id: String): SoloTopic
  }

  input UserInput {
    userId: String
    topics: [TopicInput]
  }

  input TopicInput {
    topic: String
    from: String
    likes: Int
  }


  type Mutation {
    addUser(user: UserInput): User
    addTopic(id: String ,topic: TopicInput): SoloTopic
    deleteUser(id: String): User
    deleteTopic(id: ID): SoloTopic
  }

  # type Subscription {
  #   topicAdded: Topic
  # }
`;

