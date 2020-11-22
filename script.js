// Global Variables
const t = moment();
var apiKey = "&appid=79d6c8a5c213ee81a3e63617ff2d8e9d";
var btnIndex = 0;
var storageIndex = 0;
var storageArray = [];

// Runs search when button is clicked
$("#searchButton").click(function (event) {
   
    var userCity = $("#searchInput").val().trim();
    cityWeatherData(userCity);
    localStorage.setItem(storageIndex, userCity);
    storageIndex++;
    //$("input").val("");
})

$("#clearButton").click(function () {
    localStorage.clear();
    location.reload();
    
})

// Button listener for previous search inquiries
$(".searchHistBtnList").click(function (event) {

    var storageSelector = $(event.target).attr("id");
    console.log(storageSelector);

    var savedSearch = localStorage.getItem(storageSelector);

    cityWeatherData(savedSearch);
    $("input").val("");
})

// Capitalizes first letter, used for renderStoredBtns
function capFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Renders stored search inquires as buttons
function renderStoredBtns() {

    for (i = 0; i < localStorage.length; i++) {

        var storedBtn = localStorage.getItem(i);

        var textArr = storedBtn.split(",");

        var btnText = capFirstLetter(textArr[0]);

        var searchedCityBtn = $('<button type="button" class="btn btn-secondary" id="' + btnIndex + '"></button><br><br>').text(btnText);
        $(".searchHistBtnList").append(searchedCityBtn);

        btnIndex++;

    }
}

// Main ajax function, pulls current day weather data, and contains coord data required for nested ajax
// Replaces text on the page with api weather data
function cityWeatherData(cityState) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityState + "&units=imperial" + apiKey;
    $.ajax({
        url: queryURL, method: "GET"
    }).then(function (weatherData) {

        // create icon to append from api data
        var icon = weatherData.weather[0].icon + ".png";
        var iconUrl = "http://openweathermap.org/img/wn/" + icon;
        var iconEl = $('<img src="' + iconUrl + '" alt="Weather status icon"></img>');


        $("#cityDateWI").text(weatherData.name + t.format(" (MM/DD/YYYY)")).append(iconEl);
        $("#temp").text("Temperature: " + weatherData.main.temp + "°F");
        $("#humid").text("Humidity: " + weatherData.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + weatherData.wind.speed + " MPH");

        if ($("#searchInput").val() != "") {

            console.log(btnIndex);
            var searchedCityBtn = $('<button type="button" class="btn btn-secondary" id=' + btnIndex + '></button><br><br>').text(weatherData.name);
            $(".searchHistBtnList").append(searchedCityBtn);
            btnIndex++;
            

        }
        
        // 5 day forecast
        var lat = weatherData.coord.lat;
        var lon = weatherData.coord.lon;
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial" + apiKey;

        $.ajax({
            url: queryURL, method: "GET"
        }).then(function (forecast) {

            //add UV data to current weather, not included in first api call
            var uvIndex = forecast.current.uvi;
            var uvEl = $("<span>").text(uvIndex);
            $("#uv").text("UV Index: ");
            $("#uv").append(uvEl);

            if (uvIndex < 3) {
                uvEl.addClass("bg-green");
            }
            else if (uvIndex >= 3 && uvIndex < 6) {
                uvEl.addClass("bg-yellow");
            }
            else if (uvIndex >= 6 && uvIndex < 8) {
                uvEl.addClass("bg-orange");
            }
            else if (uvIndex >= 8 && uvIndex <= 11) {
                uvEl.addClass("bg-red");
            }
            else if (uvIndex > 11) {
                uvEl.addClass("bg-violet");
            }

            var count5Day = 5;

            for (i = 0; i <= count5Day; i++) {

                // create icon to append from api data
                var icon = forecast.daily[i].weather[0].icon + ".png";
                var iconUrl = "http://openweathermap.org/img/wn/" + icon;
                var iconEl = $('<img src="' + iconUrl + '" alt="Weather status icon"></img>');

                $("#card-date" + i).text(moment.unix(forecast.daily[i].dt).format("MM/DD/YYYY"));
                $("#iconImg" + i).text("").append(iconEl);
                $("#card-temp" + i).text("Temp: " + forecast.daily[i].temp.day + " °F");
                $("#card-humid" + i).text("Humidity: " + forecast.daily[i].humidity + "%");
            }
        });
    }); 
}

// Runs Columbus, Ohio search by default so page is not empty
cityWeatherData("Columbus,Ohio");
// Render stored buttons on page load
renderStoredBtns();


