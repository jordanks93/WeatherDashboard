# WeatherDashboard
A weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

#Requires:
* JQuery
* Moment.js
* Openweathermap.org 
    * Current Weather Data API
    * One Call API 


#List of JS methods and listeners

* cityWeatherData(cityState)
  * main ajax function, pulls current weather data, and contains coordinate data required for nested ajax call
  * replaces text on the page with api weather data

* renderStoredBtns()
  *  renders stored search inquires as buttons

* $("#searchButton").click
  * runs cityWeatherData search function when search button is clicked

* $(".searchHistBtnList").click
  * runs cityWeatherData search function when a previous search button is clicked
  * stored on local

* capFirstLetter(text)
  * capitalizes the first letter of a string for button aesthetics 


## Visual:

[Demo Image](./images/weatherDash.JPG)

[Gitpages Link](https://jordanks93.github.io/WeatherDashboard/)

## Author: 
Jordan Stuckman
