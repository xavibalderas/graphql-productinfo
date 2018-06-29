const { gqlRequest } = require('graphql-request');
const { queries } = require('../queries/queries.js');
//const { request } = require ('request');
const request = require('request-promise');
const { parseString } = require('xml2js');
const fastXmlParser = require('fast-xml-parser');
//const rp = require('request-promise');

const URI_API = process.env.GRAPHCMS_API;

const optionsR = {
    uri: 'https://www.ikea.com/ch/de/catalog/products/80404672?type=xml',
    json: false // Automatically parses the JSON string in the response
};

request(optionsR).then(body => {
  console.log('34234');
  const parsedXML = fastXmlParser.parse(body);
  console.log(parsedXML);
  console.log("fdsf");
});

const resolvers = {
  Query: {
    allCombinations: () => {
      return gqlRequest(URI_API, queries.allbeds).then(data => {console.log(data); return data.allBeds;})
    },
  },
};


module.exports.resolvers = resolvers;
