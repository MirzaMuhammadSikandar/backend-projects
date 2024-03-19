
//-----------------Read Amazon Web Function------------------
async function readWeb(page) {
    let products;
    try {
      products = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.s-main-slot .sg-col-4-of-24'), (e) => ({
          title: e.querySelector('.s-widget-container .a-section .s-title-instructions-style').innerText,
          price: e.querySelector('.s-widget-container .a-section .s-price-instructions-style').innerText,
        }))
      );
    } catch (error) {
      console.log('Error Occurred!!! In scraping Amazon Website');
    }
    return products;
  }
  
  module.exports = {
    readWeb
  }