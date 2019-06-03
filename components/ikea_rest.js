const axios = require('axios');
const { xmlPromise } = require('../components/xml-promise.js');
const moment = require('moment');

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
      if (data.RetailItemComm === undefined){
        return {ItemNo: partNumber}
      }

      if(Array.isArray(data.RetailItemComm.RetailItemCommPriceList.RetailItemCommPrice)){
        //there is family price!!!
        var prices = data.RetailItemComm.RetailItemCommPriceList.RetailItemCommPrice;
        var f_p = {};
        var family = false;
        var normalPrice = 0;
        for (var i = 0; i < prices.length; i++) {
          var lpric = prices[i];
          if (lpric.RetailPriceType == 'IKEAFamilySalesUnitPrice'){
            var _from = lpric.ValidFromDateTime.slice(0, -1);
            var _to = lpric.ValidToDateTime.slice(0, -1);
            var today = moment();
            var mfrom = moment(_from, 'YYYY-MM-DD');
            var mto = moment(_to, 'YYYY-MM-DD');
            if ((mfrom<=today)&& (today<=mto)){
              family = true;
                f_p ={
                  'RetailPriceType' : 'IKEAFamilySalesUnitPrice',
                  'Price': lpric.Price,
                  'PriceExclTax': lpric.PriceExclTax,
                  'CurrencyCode': lpric.CurrencyCode,
                  'ValidFromDateTime': mfrom.format('DD-MM-YYYY'),
                  'ValidToDateTime': mto.format('DD-MM-YYYY')
                }
              }
          }else {
            normalPrice = prices[i].Price;
            if (!family){
              f_p = prices[i];
            }
          }
        }
        f_p.PriceNotOffer = normalPrice;
        data.RetailItemComm.RetailItemCommPriceList.RetailItemCommPrice = f_p;
      }

      data.RetailItemComm.ItemNo = partNumber;
      if (data.RetailItemComm.RetailItemCustomerBenefitList!== undefined){
        if (!Array.isArray(data.RetailItemComm.RetailItemCustomerBenefitList.RetailItemCustomerBenefit)){
          data.RetailItemComm.RetailItemCustomerBenefitList.RetailItemCustomerBenefit = [data.RetailItemComm.RetailItemCustomerBenefitList.RetailItemCustomerBenefit]
        }
      }
      //console.log(data.RetailItemComm.RetailItemCustomerBenefitList);
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
      d[0].stock.partNumber = partNumber;
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
