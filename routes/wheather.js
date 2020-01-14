const express = require('express');
let router = express.Router();

const WheatherController = require('../controllers/wheather');
const SearchController = require('../controllers/search');

/* GET users listing. */

router.get('/:city/:country', WheatherController.wheather_get);
router.get('/cities', SearchController.search);


module.exports = router;
