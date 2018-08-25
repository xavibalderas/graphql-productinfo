const axios = require('axios');
const { xmlPromise } = require('../components/xml-promise.js');

const uri_builder = (partNumber, language) => {
  return 'https://www.ikea.com/ch/' + language + '/iows/catalog/items/art/' + partNumber + '?method=GET&version=v2';
  //return 'http://www.ikea.com/ch/' + language + '/catalog/products/' + partNumber + '/?type=xml';
};

const processors = {
  product: (data) => {
    console.log(data);
    return {
      productName: data.RetailItemComm.ProductName
    }
  }
}

const getProduct = (partNumber, lang) => {
  const uri = uri_builder(partNumber, lang);
  return axios.get(uri)
  .then(response => {
    return xmlPromise.parse(response.data).then(data => {
      return data.RetailItemComm;
    });
  })// axios.then
  .catch(function(err) {console.log(err)});
}

const getProductList = (productList, lang) => {
  return productList.map((partNumber, index) => { return getProduct(partNumber, lang)});
}

module.exports.IKEARest =  {
  get: getProduct,
  getProducts: getProductList
}
