const { gql } = require('apollo-server');

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Combination {
    id: ID!
    reference: String
  }

  type AttributeGroup{
    GroupName: String
    AttributeList: [Attribute]
  }

  type Attribute{
    Name: String
    Value: String
  }

  type RetailItemCustomerBenefitList{
    RetailItemCustomerBenefit:[RetailItemCustomerBenefit]
  }

  type RetailItemCustomerBenefit {
    CustomerBenefitText: String
    SortNo: Int
  }

  type RetailItemCommPriceList{
    RetailItemCommPrice: RetailItemCommPrice
  }

  type RetailItemCommPrice{
    RetailPriceType: String
    Price: Float
    PriceExclTax: Float
    CurrencyCode: String
  }

  type RetailItemImageList {
    RetailItemImage: [RetailItemImage]
  }
  type RetailItemImage{
    ImageUsage: String
    ImageSize: String
    ImageUrl: String
    ImageWidth: Int
    ImageHeight: Int
    SortNo: Int
    ImageType: String
  }

  type GPRCommSelectionCriteriaSelectionList{
    GPRCommSelectionCriteriaSelection: [GPRCommSelectionCriteriaSelection]
  }

  type GPRCommSelectionCriteriaSelection{
    SelectionCriteriaCode: String
    SelectionCriteriaName: String
    SelectionCriteriaValue: String
  }

  type Productt {
    ItemNo: String
    ProductName: String
    ProductTypeName: String
    ValidDesignText: String
    OnlineSellable: Boolean
    BreathTakingItem: Boolean
    NewsType: String
    DesignerNameComm: String
    RetailItemCustomerBenefitSummaryText: String
    ItemMeasureReferenceTextMetric: String
    AttributeGroupList: [AttributeGroup]
    RetailItemCustomerBenefitList: RetailItemCustomerBenefitList
    RetailItemCommPriceList: RetailItemCommPriceList
    RetailItemImageList: RetailItemImageList
    GPRCommSelectionCriteriaSelectionList: GPRCommSelectionCriteriaSelectionList
  }

  type Availability {
    partNumber: String
    availableStock: Int
    inStockProbabilityCode: String
    findItList: FindItList
  }

  type FindItList {
    findIt: FindIt
  }

  type FindIt {
    partNumber: String
    quantity: Int
    type: String
    box: Int
    shelf: Int
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
    availability(productList: [String]!, lang: String!, store: String!): [Availability]
  }
`;

module.exports.typeDefs = typeDefs;
