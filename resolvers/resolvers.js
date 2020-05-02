const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const users = [
  {
    id: "jean",
    name: "The Carlos",
    topPoints: 46,
  },
  {
    id: "nol",
    name: "supanola",
    topPoints: 92,
  },
  {
    id: "jay",
    name: "l0tso",
    topPoints: 465,
  },
];

const topics = [
  {
    id: "44444",
    msg: "this is a topic",
    date: new Date("04-20-2020"),
    likes: 5,
    user: [
      {
        id: "jean",
      },
    ],
  },
  {
    id: "44455",
    msg: "this is a topic 2222",
    date: new Date("04-24-2020"),
    likes: 2,
    user: [
      {
        id: "nol",
      },
    ],
  },
];

/*A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API. If you don't define a resolver for a particular field, Apollo Server automatically defines a default resolver for it.*/
module.exports = {
  Query: {
    topics: () => {
      return topics;
    },
    topic: (obj, { id }, context, info) => {
      const foundTopic = topics.find((t) => {
        return id === t.id;
      });
      return foundTopic;
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
    addTopic: (obj, { topic }, { userId }) => {
      if (userId) {
        const newTopicsList = [
          ...topics,
          //New Topic data
          topic,
        ];
        // Return data as expected
        return newTopicsList;
      } else {
        return topics;
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