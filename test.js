const axios = require('axios');

axios.get('https://www.ikea.com/ch/de/catalog/products/30319129/?type=xml')
  .then(response => {
    process.stdout.write(response.data);
  })
  .catch(error => {
    process.stdout.write(error);
  });
