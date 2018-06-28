const { request } = require('graphql-request');
const { queries } = require('../queries/queries.js');

const URI_API = process.env.GRAPHCMS_API;

const resolvers = {
  Query: {
    allCombinations: () => {
      return request(URI_API, queries.allbeds).then(data => {console.log(data); return data.allBeds;})
    },
  },
};


module.exports.resolvers = resolvers;
