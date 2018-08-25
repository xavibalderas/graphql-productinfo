const Promise = require('promise');
const fastXmlParser = require('fast-xml-parser');


const options = {
  ignoreAttributes : false,
  attributeNamePrefix: '',
  attrNodeName: 'attr',
  textNodeName: 'value',
  localeRange: "",
  ignoreNameSpace: true
};


module.exports.xmlPromise =  {

  parse: function (body){
    return new Promise(function(resolve, reject){
      if(fastXmlParser.validate(body) === true ){
        var data = fastXmlParser.parse(body, options);
        resolve(data);
      }

    });
  }
}
