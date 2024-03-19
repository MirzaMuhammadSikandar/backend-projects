//-----------------Data Cleaning Function------------------
async function dataCleaner(products) {
    for (let i = 0; i < products.length; i++) {
      let priceData = "";
      for (let j = 0; j < products[i]['price'].length; j++) {
  
        if (products[i]['price'][j] == '\n') {
          products[i]['price'] = priceData;
          break;
        }
        priceData += products[i]['price'][j]
      }
    }
    return products;
  }
  
  //-----------------JS Object to Array Conversion Function------------------
  async function objToArray(products) {
    let productsData = [];
  
    for (let i = 0; i < products.length; i++) {
      let temp = [];
      temp.push(products[i]['title']);
      temp.push(products[i]['price']);
      productsData.push(temp);
    }
  
    return productsData;
  }

  module.exports = {
    dataCleaner,
    objToArray
  }