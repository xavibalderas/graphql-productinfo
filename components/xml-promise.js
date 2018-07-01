const Promise = require('promise');
const fastXmlParser = require('fast-xml-parser');


const options = {
  ignoreAttributes : false,
  attributeNamePrefix: '',
  attrNodeName: 'attr',
  textNodeName: 'value'
};


module.exports.xmlPromise =  {

  parse: function (body){
    return new Promise(function(resolve, reject){
      const data = fastXmlParser.parse(body, options);
      resolve(data);
    });
  }
}
