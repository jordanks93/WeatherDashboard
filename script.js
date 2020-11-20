// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

// api.openweathermap.org/data/2.5/weather?q=Columbus,Ohio&appid=79d6c8a5c213ee81a3e63617ff2d8e9d
// api.openweathermap.org/data/2.5/weather?q=Columbus,Ohio&units=imperial&appid=79d6c8a5c213ee81a3e63617ff2d8e9d
const t = moment();
var apiKey = "&appid=79d6c8a5c213ee81a3e63617ff2d8e9d";

var forecastArr = [];

console.log(forecastArr);




var cityWeatherData = function (cityState) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityState + "&units=imperial" + apiKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL, method: "GET"
    }).then(function (weatherData) {

        $("#cityDateWI").text(weatherData.name + t.format(" MM/DD/YYYY"));
        $("#temp").append(" " + weatherData.main.temp + "°F");
        $("#humid").append(" " + weatherData.main.humidity + "%");
        $("#windSpeed").append(" " + weatherData.wind.speed + " MPH");

        // 5 day forecast
        var lat = weatherData.coord.lat;
        var lon = weatherData.coord.lon;
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial" + apiKey;
        console.log(queryURL);

        $.ajax({
            url: queryURL, method: "GET"
        }).then(function (forecast) {

            //add UV data to current weather, not included in first api call
            $("#uv").append(" " + forecast.current.uvi);

            var count5Day = 5;
            console.log(forecast.daily[0].temp.day);
            for (i = 0; i <= count5Day; i++) {

                $("#card-date" + i).append(moment.unix(forecast.daily[i].dt).format("MM/DD/YYYY"));
                $("#card-temp" + i).append(" " + forecast.daily[i].temp.day + " °F");
                $("#card-humid" + i).append(" " + forecast.daily[i].humidity + "%");
            }

        });

    }); //first ajax end tag
}

cityWeatherData("Columbus,Ohio");



