const { ApolloServer, gql } = require('apollo-server');
const { request } = require('graphql-request');

const URI_API = process.env.GRAPHCMS_API;
const books = [
  {
    id: "fdsfs",
    name: "dsgdfsdf"
  }
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Combination {
    id: ID!
    reference: String
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    allCombinations: [Combination]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    allCombinations: () => {
      const query = `{
                        allBeds {
                          reference
                        }
                      }`

      return request(URI_API, query).then(data => {console.log(data); return data.allBeds;})
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({port:process.env.PORT}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
