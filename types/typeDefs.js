const { gql } = require('apollo-server');

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Combination {
    id: ID!
    reference: String
  }

  type Product {
    partNumber: String!
    name: String
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    allCombinations: [Combination]
    product(partNumber: String!): Product
  }
`;

module.exports.typeDefs = typeDefs;
