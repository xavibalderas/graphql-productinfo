const { gql } = require('apollo-server');

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Combination {
    id: ID!
    reference: String
  }

  type Productt {
    ItemNo: String
    ProductName: String
    ProductTypeName: String
    ValidDesignText: String
    OnlineSellable: Boolean
    BreathTakingItem: Boolean
    DesignerNameComm: String
  }

  type Product {
    partNumber: String!
    lang: String
    name: String
    type: String
    normalPrice: String!
    secondPrice: String
    priceDisclaimer: String
    familyPrice_startDate: String
    familyPrice_endDate: String
    familyPrice_price: String
    familyPrice_disclaimer: String
    info: [String]
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    #allCombinations: [Combination]
  #  combination(reference: String!): Combination
    product(partNumber: String!, lang: String!): Product
    products(productList: [String]!,  lang: String!): [Productt]
  }
`;

module.exports.typeDefs = typeDefs;
