const { ApolloServer, gql } = require('apollo-server');
const { typeDefs } = require('./types/typeDefs.js');
const { resolvers } = require('./resolvers/resolvers.js');

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({port:process.env.PORT}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
