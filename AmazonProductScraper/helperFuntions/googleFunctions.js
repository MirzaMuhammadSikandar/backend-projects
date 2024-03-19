const { google } = require('googleapis');

//-----------------Read Google Sheets Function------------------
async function read(auth, googleSheets, spreadsheetId) {
    try {
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A:B"
      })
  
      return getRows;
    } catch (error) {
      console.log('ERROR!!! In reading google Sheets')
    }
  }

  //-----------------Write webData Google Sheets Function------------------
async function write(auth, googleSheets, spreadsheetId, productsData) {
  try {
    const writeRes = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet2!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: productsData
      }
    });
    if (writeRes.status == 200) {
      console.log('Data has been Successfully Written to google sheets')
    }
  } catch (error) {
    console.log('ERROR!!! In writing to google sheets')
  }
}

  module.exports = {
    read,
    write
  }