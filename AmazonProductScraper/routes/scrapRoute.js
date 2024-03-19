const router = require('express').Router();
const {scraper} = require('../controllers/scrapController.js')

router.post('/scrap', scraper);

module.exports = router;