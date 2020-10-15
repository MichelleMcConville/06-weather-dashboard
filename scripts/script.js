var date = moment().format("MM/DD/YYYY");
var cities = "Belton";



// F(x) for displaying cities in sideNav
function citiesList() {
  $("ul-view").empty();

  for (var i = 0; i < cities.length; i++) {
    var a = $("<ul>");
    a.addClass("city");
    a.attr("city-name", cities[i]);
    a.text(cities[i]);
    $("ul-view").append(a);
  }
}

// F(x) for search button click event
$("searchBox").on("click", function(event) {
  event.preventDefault();
  var city = $("#addCity").val().trim();
  cities.push(city);
  citiesList();
});
$(document).on("click", ".searchBox", citiesList);
citiesList();

// TODAY
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cities + "&units=imperial&appid=bf44d6b9da075580825f81e2aa54cf78";
console.log(queryURL);

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
    
    $("#name").text(response.name + " (" + date +  ")");
    $("#icon").text(response.weather[0].icon)
    $("#temp").text("Temperature: " + response.main.temp + " \u00B0F");
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
    $("#uvIndex").text("UV Index: " + response.main.temp);
    
    console.log(response);
    
    console.log(response.weather[0].icon);
    console.log(response.name);
    console.log(response.main.temp);
    console.log(response.main.humidity);
    console.log(response.wind.speed);
    console.log(response.main.temp);
});



// 05-Day Forecast
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cities + "&units=imperial&appid=bf44d6b9da075580825f81e2aa54cf78";
console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    $("#d01").text(response.list[1].dt_txt);
    $("#t01").text("Temp: " + response.list[1].main.temp + " \u00B0F");
    $("#i01").text(response.list[1].weather[0].icon);
    $("#h01").text("Humidity: " + response.list[1].main.humidity + "%");
    console.log(response.list[1].dt_txt);
    console.log(response.list[1].weather[0].icon);
    console.log(response.list[1].main.temp);
    console.log(response.list[1].main.humidity);

});
