var date = moment().format("MM/DD/YYYY");
var cities = [];
var city = "";

loadCity();

//init function

// Saving cities to local storage
function saveCity() {
  localStorage.setItem("lscity", JSON.stringify(cities));
};

// Getting cities from local storage
function loadCity() {
  cities = JSON.parse(localStorage.getItem("lscity"));
};

// F(x) for displaying cities in sideNav
function citySearchList() {
  $("#ul-view").empty();

  for (var i = 0; i < cities.length; i++) {
    var newLi = $("<li>").attr("class","city-list").attr("city-name", cities[i]).text(cities[i]);
    $("#ul-view").prepend(newLi);
    console.log(newLi);
  }
}

// F(x) for search button click event
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  city = $("#addCity").val().trim();
  $("#addCity").val("");
  cities.push(city);
  saveCity();
  loadCity();
  citySearchList();
});
// $(document).on("click", "#searchBtn", citySearchList);
citySearchList();



// TODAY
function weather() {
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=bf44d6b9da075580825f81e2aa54cf78";
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
};



// 05-Day Forecast
function forecast() {
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=bf44d6b9da075580825f81e2aa54cf78";
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
};
