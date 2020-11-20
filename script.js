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

var forecastArr = [{
    "date" : "",
    "icon" : "",
    "forecastTemp" : 0,
    "forecastHumidity" : 0   
}];

console.log(forecastArr);


var searchCurrentWeather = function (cityState) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityState + "&units=imperial&appid=79d6c8a5c213ee81a3e63617ff2d8e9d";
    $.ajax({
        url: queryURL, method: "GET"
    }).then(function (weatherData) {
        //testing
        console.log(queryURL);
        console.log(weatherData);
        console.log(weatherData.main.temp);

        $("#cityDateWI").text(weatherData.name + t.format(" MM/DD/YYYY"));
        $("#temp").append(" " + weatherData.main.temp + "°F");
        $("#humid").append(" " + weatherData.main.humidity + "%");
        $("#windSpeed").append(" " + weatherData.wind.speed + " MPH");



    });
}

var search5DayWeather = function (cityState) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityState + "&cnt=6&units=imperial&appid=79d6c8a5c213ee81a3e63617ff2d8e9d";
    $.ajax({
        url: queryURL, method: "GET"
    }).then(function (forecast) {
        //testing
        console.log(forecast.list[0].main.temp);
        for(i=1; i< 6; i++) {
          
          console.log(forecast.list[i].main.temp);
          console.log(forecast.list[i].dt_txt);
          $("#card-temp" + i).append(" " + forecast.list[i].main.temp + " °F");
          $("#card-humid" + i).append(" " + forecast.list[i].main.humidity + "%");
        }



    });
}

searchCurrentWeather("Columbus,Ohio");
search5DayWeather("Columbus,Ohio");


