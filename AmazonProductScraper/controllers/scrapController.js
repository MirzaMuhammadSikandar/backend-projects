const puppeteer = require('puppeteer');
const { google } = require('googleapis');
const {config} = require('../configuration/config.js')
const {read, write} = require('../helperFuntions/googleFunctions.js')
const {readWeb} = require('../helperFuntions/webFunctions.js')
const {dataCleaner, objToArray} = require('../helperFuntions/OtherFunctions.js')

//----------------------- Scraper -----------------------
const scraper = async (request, response) => {
    try {
        let { auth, googleSheets, spreadsheetId } = await config();
        let getRows = await read(auth, googleSheets, spreadsheetId);
        let readData = getRows.data.values;

        console.log('readData----', readData);
        let productName = [];
        for (let i = 0; i < readData.length; i++) {
            if (readData[i][1] == 'y') {
                productName.push(readData[i][0]);
            }
        }
        
        if (productName) {
            const browser = await puppeteer.launch({headless:false});
            const page = await browser.newPage();

            for (let i = 0; i < productName.length; i++) {
                let totalPages = 2;
                for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
                    await page.goto("https://www.amazon.com/s?k=" + productName[i] + "&page=" + pageNo);

                    console.log('product-------', productName[i], '  pageNo--------', pageNo);
                    let products = await readWeb(page);
                    if (products) {
                        products = await dataCleaner(products);

                        let productsData = await objToArray(products);

                        await write(auth, googleSheets, spreadsheetId, productsData);
                    }
                    else {
                        console.log("NO Products Found on Amazon Web!")
                    }
                }
            }
            console.log("Scrapping Completed!!!")
        }
        else {
            console.log("Product Names NOT Found!")
        }
    } catch (error) {
        console.log('ERROR!!! In Scraping Occurred.', error)
    }
    return response.status(200).send('Scrapping Completed!!!');
}

module.exports = {
    scraper
}