const { PubSub } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const Topic = require("../schemas/topicSchema");
const User = require("../schemas/userSchema");

const pubsub = new PubSub();
const TOPIC_ADDED = "TOPIC_ADDED";

/*A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API. If you don't define a resolver for a particular field, Apollo Server automatically defines a default resolver for it.*/
module.exports = {
  // Subscription: {
  //   topicAdded: {
  //     subscribe: () => pubsub.asyncIterator([TOPIC_ADDED]),
  //   },
  // },

  Query: {
    users: () => {
      try {
        const allUsers = User.find();
        return allUsers;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    addUser: async (obj, args, { userId }) => {
      console.log(args);
      try {
        if (userId) {
          const newUser = await User.create({
            lotso: {
              topics: [
                { topic: "gitjgojtre", from: "user1", likes: 501 },
                { topic: "gitjgojtre22", from: "user44", like: 654 },
              ],
            },
          });
          return userId;
        }
      } catch (e) {
        return [];
      }
    },
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "its a date",
    parseValue(value) {
      //value from the client
      return new Date(value);
    },
    serialize(value) {
      // value sent to the client
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};
