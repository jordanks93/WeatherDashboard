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


var searchWeather = function (cityState) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityState + "&units=imperial&appid=79d6c8a5c213ee81a3e63617ff2d8e9d";
    $.ajax({url: queryURL, method: "GET"
    }).done(function (weatherData) {
        console.log(queryURL);
        console.log(weatherData);
    });
}

console.log(searchWeather("Columbus,Ohio"));
// var temp = searchWeather("Columbus,Ohio").weatherData.main.temp;
// console.log(temp);

// var cloudLevel = searchWeather("Columbus,Ohio");
// console.log(cloudLevel);

searchWeather("Columbus,Ohio");


