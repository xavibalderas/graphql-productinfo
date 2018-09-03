const axios = require('axios');
const { xmlPromise } = require('../components/xml-promise.js');

const uri_builder = (partNumber, language) => {
  return {
    product_info: 'https://www.ikea.com/ch/' + language + '/iows/catalog/items/art/' + partNumber + '?method=GET&version=v2',
    availability: 'https://www.ikea.com/ch/' + language + '/iows/catalog/availability/' + partNumber
  }
  return 'https://www.ikea.com/ch/' + language + '/iows/catalog/items/art/' + partNumber + '?method=GET&version=v2';
  //return 'http://www.ikea.com/ch/' + language + '/catalog/products/' + partNumber + '/?type=xml';
};

const getProduct = (partNumber, lang) => {
  const uri = uri_builder(partNumber, lang);
  return axios.get(uri.product_info)
  .then(response => {
    return xmlPromise.parse(response.data).then(data => {
      data.RetailItemComm.ItemNo = partNumber;
      return data.RetailItemComm;
    });
  })// axios.then
  .catch(function(err) {console.log(err)});
}

const getAvailability = (partNumber, lang, store) => {
  const uri = uri_builder(partNumber, lang);
  return axios.get(uri.availability)
  .then(response => {
    return xmlPromise.parse(response.data).then(data => {
      let d =  data['ikea-rest'].availability.localStore.filter((element, index)=>{return element.attr.buCode==store ? true : false});
      console.log(d[0].stock);
      return d[0].stock;
    });
  })// axios.then
  .catch(function(err) {console.log(err)});
}

const getAvailabilityList = (productList, lang, store) => {
  return productList.map((partNumber, index) => { return getAvailability(partNumber, lang, store)});
}

const getProductList = (productList, lang) => {
  return productList.map((partNumber, index) => { return getProduct(partNumber, lang)});
}

module.exports.IKEARest =  {
  get: getProduct,
  getProducts: getProductList,
  getAvailability: getAvailabilityList
}
