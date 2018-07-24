const { gqlRequest } = require('graphql-request');
const { queries } = require('../queries/queries.js');
const request = require('request-promise');
const axios = require('axios');

const { xmlPromise } = require('../components/xml-promise.js');

const URI_API = process.env.GRAPHCMS_API;

const resolvers = {
  Query: {

    product: (root, args, context, info) => {

      const partNumber = args.partNumber;
      return axios.get('http://www.ikea.com/ch/de/catalog/products/' + partNumber + '/?type=xml').then(response => {
        console.log("----START_RAW_DATA----");
        console.log(response.data);
        console.log("----FINISH_RAW_DATA----");
        return xmlPromise.parse(response.data).then(data => {
          console.log(data);

          var _d = {
            name: data['ir:ikea-rest'].products.product.name,
            partNumber: data['ir:ikea-rest'].products.product.partNumber,
            type: data['ir:ikea-rest'].products.product.items.item.type,
            normalPrice: data['ir:ikea-rest'].products.product.items.item.prices.normal.priceNormal.attr.unformatted,
            secondPrice: data['ir:ikea-rest'].products.product.items.item.prices.second.priceNormal,
            familyPrice_startDate: data['ir:ikea-rest'].products.product.items.item.prices['family-normal'].priceNormal.attr.startDate,
            familyPrice_endDate: data['ir:ikea-rest'].products.product.items.item.prices['family-normal'].priceNormal.attr.endDate,
            familyPrice_price: data['ir:ikea-rest'].products.product.items.item.prices['family-normal'].priceNormal.attr.unformatted,
            familyPrice_disclaimer: data['ir:ikea-rest'].products.product.items.item.prices['family-normal'].priceDisclaimer,
          }
          return _d;
        })
      })
      .catch(function(err) {console.log(err)});
    },
  },
};


module.exports.resolvers = resolvers;
