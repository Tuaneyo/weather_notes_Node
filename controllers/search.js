const async = require('async');
const cities = require('../public/data/city.list');
// Old node version of adsd.clow doesn't recognise async so that will not be used in adsd.clow environment
// show API of the cities in JSON
exports.search = (req, res, next) =>{
    try {
        res.send(cities);
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e)
    }

};