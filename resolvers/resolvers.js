const { PubSub } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const Topic = require("../schemas/topicSchema");

const pubsub = new PubSub();
const TOPIC_ADDED = "TOPIC_ADDED";

/*A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API. If you don't define a resolver for a particular field, Apollo Server automatically defines a default resolver for it.*/
module.exports = {
  Subscription: {
    topicAdded: {
      subscribe: () => pubsub.asyncIterator([TOPIC_ADDED]),
    },
  },

  Query: {
    topics: () => {
      try {
        const allTopics = Topic.find();
        return allTopics;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    topic: async (obj, { id }, context, info) => {
      try {
        const foundTopic = await Topic.findById(id);
        return foundTopic;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
  },

  Topic: {
    user: (obj, args, context) => {
      const userIds = obj.user.map((u) => u.id);
      const filteredUsers = users.filter((u) => {
        return userIds.includes(u.id);
      });
      return filteredUsers;
    },
  },

  Mutation: {
    addTopic: async (obj, { topic }, { userId }) => {
      console.log(userId);

      try {
        if (userId) {
          const newTopic = await Topic.create({
            ...topic,
          });
          pubsub.publish(TOPIC_ADDED, { topicAdded: newTopic });
          const allTopics = await Topic.find();
          return allTopics;
        }
        return topics;
      } catch (e) {
        console.log(e)
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

// const users = [
//   {
//     id: "jean",
//     name: "The Carlos",
//     topPoints: 46,
//   },
//   {
//     id: "nol",
//     name: "supanola",
//     topPoints: 92,
//   },
//   {
//     id: "jay",
//     name: "l0tso",
//     topPoints: 465,
//   },
// ];

// const topics = [
//   {
//     id: "44444",
//     msg: "this is a topic",
//     date: new Date("04-20-2020"),
//     likes: 5,
//     user: [
//       {
//         id: "jean",
//       },
//     ],
//   },
//   {
//     id: "44455",
//     msg: "this is a topic 2222",
//     date: new Date("04-24-2020"),
//     likes: 2,
//     user: [
//       {
//         id: "nol",
//       },
//     ],
//   },
// ];
