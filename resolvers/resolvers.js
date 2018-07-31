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
      const q_lang = args.lang;
      return axios.get('http://www.ikea.com/ch/' + q_lang + '/catalog/products/' + partNumber + '/?type=xml').then(response => {
        console.log("----START_RAW_DATA----");
        console.log(response.data);
        console.log("----FINISH_RAW_DATA----");
        return xmlPromise.parse(response.data).then(data => {

          var _d = {
            name: data['ir:ikea-rest'].products.product.name,
            partNumber: data['ir:ikea-rest'].products.product.items.item.partNumber,
            type: data['ir:ikea-rest'].products.product.items.item.type,
            normalPrice: data['ir:ikea-rest'].products.product.items.item.prices.normal.priceNormal.attr.unformatted,
            secondPrice: (data['ir:ikea-rest'].products.product.items.item.prices.normal.pricePrevious!='') ? data['ir:ikea-rest'].products.product.items.item.prices.normal.pricePrevious.attr.unformatted : '',
            priceDisclaimer: (data['ir:ikea-rest'].products.product.items.item.prices.normal.priceDisclaimer!='') ? data['ir:ikea-rest'].products.product.items.item.prices.normal.priceDisclaimer : '',
            familyPrice_startDate: '',
            familyPrice_endDate: '',
            familyPrice_price: '',
            familyPrice_disclaimer: '',
            lang: q_lang
          }

          if(data['ir:ikea-rest'].products.product.items.item.prices['family-normal'].priceNormal!=''){
            _d.familyPrice_startDate = data['ir:ikea-rest'].products.product.items.item.prices['family-normal'].priceNormal.attr.startDate;
            _d.familyPrice_endDate = data['ir:ikea-rest'].products.product.items.item.prices['family-normal'].priceNormal.attr.endDate;
            _d.familyPrice_price = data['ir:ikea-rest'].products.product.items.item.prices['family-normal'].priceNormal.attr.unformatted;
            _d.familyPrice_disclaimer = data['ir:ikea-rest'].products.product.items.item.prices['family-normal'].priceDisclaimer;
          }
          var infos = [];
          const att = data['ir:ikea-rest'].products.product.items.item.attributesItems.attributeItem;
          for (var i = 0; i < att.length; i++) {
            if (att[i].value !="-"){
              infos.push(att[i].attr.name + ': ' + att[i].value);
            }
          }
          _d.info = infos;
          return _d;
        })
      })
      .catch(function(err) {console.log(err)});
    },
  },
};


module.exports.resolvers = resolvers;
