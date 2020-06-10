const { PubSub } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const { TopicModel } = require("../schemas/topicSchema");
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
    users: async () => {
      try {
        const allUsers = User.find();
        return allUsers;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    user: async (obj, { id }, context) => {
      console.log(id);
      try {
        const foundUser = await User.findById(id);
        return foundUser;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    topic: async (obj, { id }, context) => {
      try {
        const foundTopic = User.findOne({ id });

        return foundTopic;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    addUser: async (obj, { user }, context) => {
      console.log(user);
      try {
        if (user.userId) {
          const newUser = await User.create({
            ...user,
          });

          return newUser;
        }
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    addTopic: async (obj, { id, topic }, context) => {
      // console.log("id", id)
      console.log("new topic", topic);

      try {
        const foundUser = await User.findByIdAndUpdate(id, {
          $push: {
            topics: topic,
          },
        });
        return topic;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    deleteUser: async (obj, { id }, context) => {
      // console.log("id", id)
      console.log(id);

      try {
        const foundUser = await User.findByIdAndRemove(id, (err) => {
          if (err) console.log(err);
          console.log("Successful deletion");
        });

        return foundUser;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    deleteTopic: async (obj, { id }, context) => {
      // console.log("id", id)
      // console.log(id);

      try {
        const deletedTopic = User.findOneAndRemove({"topics._id": id}, {
          $pull: { topics: { _id: id } },
        });
        
        return deletedTopic;
      } catch (e) {
        console.log(e);
        return [];
      }
      // const deletedTopic = await TopicModel.deleteOne({ id });
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
