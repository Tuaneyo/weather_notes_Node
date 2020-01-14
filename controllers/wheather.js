const request = require('request');
const async = require('async');
const date = require('date-and-time');

/**
 * Get wheater data from API's and return them to view with json data
 * */
exports.wheather_get = (req, res, next) => {
    // Defining application default city and country code
    let city = req.params.city;
    let country = req.params.country.toLowerCase();
    // Async load two different API
    async.series([
            function(callback) {
                request(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=9727c9d9a3c14b1e21d9f4fffb6ee72a`, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        return callback(null, body);
                    }
                    return callback(error || new Error('Response non-200'));
                });
            },
            function(callback) {
                request(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9727c9d9a3c14b1e21d9f4fffb6ee72a`, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        return callback(null, body);
                    }
                    return callback(error || new Error('Response non-200'));
                });
            }
        ],
        function(err, results) {
            if (err) {
                // Redirect ot default wheather page with default param
                console.log(err);
                req.flash('danger', 'City cant be found');
                res.location('/~s1131670/P2_NodeJS_Opdracht/70/wheather/Almere/nl');
                res.redirect('/~s1131670/P2_NodeJS_Opdracht/70/wheather/Almere/nl');
            }else{
                // Put the data of API into a JSON for the view
                let wheather = JSON.parse(results[0]);
                let forecast = JSON.parse(results[1]);
                let wheatherData = getWheather(wheather, forecast, city);

                let timeObj = getTime();
                // Send the data to the view
                res.render('wheather/index', {wheather: wheatherData.wheather, forecast: wheatherData.forecast ,date: timeObj.date});
            }

        });
};

/**
 * Storing data from api's into object
 * */
getWheather = function(data, forecast ,city) {
    // JSON data of the weather of the chosen wheather
    let wheather = {
        city: city,
        temperature: Math.round(data.main.temp - 273),
        country_code: data.sys.country,
        min_temperature: Math.round(data.main.temp_min - 273),
        max_temperature: Math.round(data.main.temp_max - 273),
        speed: data.wind.speed,
        lon: data.coord.lon,
        lat: data.coord.lat,
        compas: data.wind.deg,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        sunrise: new Date(parseInt( data.sys.sunrise)*1000 ),
        sunset: new Date(parseInt(data.sys.sunset)*1000),
    };

    let forecastData = [];
    // Loop the array of the weather API's data to make it readable for the view
    for(let i =0;i<= 4;i++){
        forecastData.push({
            time: forecast.list[i].dt_txt.slice(11,16),
            condition: forecast.list[i].weather[0].main,
            icon: forecast.list[i].weather[0].icon,
            temp:  Math.round(forecast.list[i].main.temp - 273)
        });
    }
    // Collect all weahter data from different API to one JSON
    let wheatherData = {wheather: wheather, forecast: forecastData};

    wheatherData.wheather.sunrise = date.format(wheather.sunrise, 'HH:mm');
    wheatherData.wheather.sunset = date.format(wheather.sunset, 'HH:mm');

    return wheatherData;
};
