const { PubSub } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const { TopicModel } = require("../schemas/topicSchema");
const User = require("../schemas/userSchema");

const pubsub = new PubSub();
const TOPIC_ADDED = "TOPIC_ADDED";

/*A resolver is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API. If you don't define a resolver for a particular field, Apollo Server automatically defines a default resolver for it.*/
module.exports = {
 
};
