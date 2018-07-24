const { gqlRequest } = require('graphql-request');
const { queries } = require('../queries/queries.js');
const request = require('request-promise');

const { xmlPromise } = require('../components/xml-promise.js');

const URI_API = process.env.GRAPHCMS_API;

const resolvers = {
  Query: {
    //allCombinations: () => {
      //return gqlRequest(URI_API, queries.allbeds).then(data => {
        //console.log(data);
        //return data.allBeds;
      //})
    //},
    product: (root, args, context, info) => {
      //console.log(args);
      //console.log(root);
      //console.log(context);
      //console.log(info);
      const partNumber = args.partNumber;
      const r_uri =  {
        uri: 'https://www.ikea.com/ch/de/catalog/products/30319129/?type=xml', //http://www.ikea.com/ch/de/catalog/products/' + partNumber + '/?type=xml',
        json: false, // Automatically parses the JSON string in the response
        headers:{
          'Content-Type': 'text/xml',
          'Cache-Control': 'no-cache'
        }
      }
      console.log(r_uri);

      return request(r_uri).then(body => {
        console.log("----TEST----");
        console.log(body);
        console.log("----TEST----");
        return xmlPromise.parse(body).then(data => {
          console.log(data);
          var _d = {
            name: data['ir:ikea-rest'].products.product.name,
            partNumber: data['ir:ikea-rest'].products.product.partNumber,
          }
          //console.log(_d);
          return _d;
        })
      })
      .catch(function(err) {console.log(err)});
    },
/*    combination: (root, args, context, info) => {
      const reference = args.reference;
      return gqlRequest().then( data => {
        return data.bed;
      });

    }*/

  },
};


module.exports.resolvers = resolvers;
