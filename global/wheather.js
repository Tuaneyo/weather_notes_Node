
getWheather = function(city){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9727c9d9a3c14b1e21d9f4fffb6ee72a`;
    let wheatherData = {};
    request(url, function(error, repsonse, body){
        let data = JSON.parse(body);
        if(data.cod == "404"){
            wheatherData = false;
        }else{
            let timeObj = getTime();

            var wheather = {
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
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
            };
            wheatherData = {wheather: wheather};
            let now = new Date();
            let sunrise = new Date(parseInt(wheatherData.wheather.sunrise)*1000 );
            let sunset = new Date(parseInt(wheatherData.wheather.sunset)*1000);

            wheatherData.wheather.sunrise = date.format(sunrise, 'HH:mm');
            wheatherData.wheather.sunset = date.format(sunset, 'HH:mm');

        }

    });
    return wheatherData;
};

module.exports = {
    wheather: getWheather
};