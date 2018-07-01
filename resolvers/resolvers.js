const { gqlRequest } = require('graphql-request');
const { queries } = require('../queries/queries.js');
const request = require('request-promise');
const fastXmlParser = require('fast-xml-parser');
const Promise = require('promise');
const fs = require('fs');
//const rp = require('request-promise');

const URI_API = process.env.GRAPHCMS_API;

const optionsR = {
    uri: 'https://www.ikea.com/ch/de/catalog/products/50364149/?type=xml',
    json: false // Automatically parses the JSON string in the response
};

const options = {
  ignoreAttributes : false,
  attributeNamePrefix: '',
  attrNodeName: 'attr',
  textNodeName: 'value'
}

const parseP = function(body){
  return new Promise(function(resolve, reject){
    const data = fastXmlParser.parse(body, options);
    console.log('23');
    resolve(data);
  });
}


/*request(optionsR).then(body => {
  console.log('34234');
  parseP(body).then(data=>{
    console.log(data);
    fs.writeFile('object.json', JSON.stringify(data), (err) => {
      if (err) throw err;
        console.log('The file has been saved!');
      });

  });
  console.log("fdsf");
});*/

const resolvers = {
  Query: {
    allCombinations: () => {
      return gqlRequest(URI_API, queries.allbeds).then(data => {console.log(data); return data.allBeds;})
    },
    product: (root, args, context, info) => {
      console.log(args);
      console.log(root);
      console.log(context);
      console.log(info);
      const partNumber = args.partNumber;
      const r_uri =  {
        uri: 'https://www.ikea.com/ch/de/catalog/products/' + partNumber + '/?type=xml',
        json: false // Automatically parses the JSON string in the response
      }
      return request(r_uri).then(body => {
        return parseP(body).then(data => {
          const _d = {
            name: data['ir:ikea-rest'].products.product.name,
            partNumber: data['ir:ikea-rest'].products.product.partNumber,
          }
          console.log(_d);
          return _d;
        })
      });
    }
  },
};


module.exports.resolvers = resolvers;
