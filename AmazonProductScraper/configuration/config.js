const { google } = require('googleapis');

//-----------------Configuration Function------------------
async function config() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    //create client instance for auth
    const client = await auth.getClient();

    //instance of google sheets api
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1RF9PYA2h2vs464PwH_Wkj8fvtBdUcGp8HHrmxDLL6Rw";

    return { auth, googleSheets, spreadsheetId };
}

module.exports = {
    config
};


//zindagi kitne haseen
//chupkai sae yae kahai