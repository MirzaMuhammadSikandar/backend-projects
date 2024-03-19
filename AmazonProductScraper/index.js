const express = require("express");
const PORT = 5555;
const Route = require('./routes/scrapRoute.js')

const app = express();

app.use('/amazon', Route);

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});