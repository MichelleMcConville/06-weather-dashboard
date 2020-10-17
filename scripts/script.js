var date = moment().format("MM/DD/YYYY");
var cities;
var city = "";

loadCity();

//init function

// Getting cities from local storage
function loadCity() {
  cities = JSON.parse(localStorage.getItem("lscity"));
  if (cities) {
    console.log(cities[cities.length - 1]);
    weatherData(cities[cities.length - 1])
  } else {
    cities = [];
  }
}

//Dynamically building City List under search box
function citySearchList() {
  $("#ul-view").empty();

  for (var i = 0; i < cities.length; i++) {
    var newLi = $("<li>").attr("class", "city-list").attr("city-name", cities[i]).text(cities[i]);
    $("#ul-view").prepend(newLi);
  }
}

// Saving cities to local storage
function saveCity() {
  localStorage.setItem("lscity", JSON.stringify(cities));
}

// F(x) for search button click event
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  city = $("#addCity").val().trim();
  console.log(city)
  weatherData(city);
});

// Loads city on refresh only add cities if not in the list
function weatherData(city) {
  $("#addCity").val("");
  if (cities.includes(city) === false) {
    cities.push(city);
    saveCity(city);  
  }
    citySearchList();
    weatherToday(city);
    forecastDeck(city);
}

// Today's weather block
function weatherToday(city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=bf44d6b9da075580825f81e2aa54cf78";
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var date = moment.unix(response.dt).format("MM/DD/YYYY");
    var name = response.name;
    var icon = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    var uvIndex = "";
    $("#today").append(
    `<div id="today" class="row">
      <h2 id="name">City (Date) Icon</h2>
      <p id="temp">Temp</p>
      <p id="humidity">Humidity</p>
      <p id="windSpeed">Wind Speed</p>
      <p id="uvIndex">UV INdex</p>
    </div>`
    )
  });
}

// Dynamically building the weatherToday section
// function showWeatherToday(name, date, icon, temp, humidity, windSpeed, uvIndex) {
//   $("#today").empty();

//   var newH2 = $("<h2>").attr("id", "name").text(name + " (" + date + ") ");
//   $("<img>").attr("id", "icon").attr("src", icon).attr("alt", "todays weather icon").appendTo(newH2);

//   var newP1 = $("<p>").attr("id", "temp").text("Temperature: " + temp + " \u00B0F");
//   var newP2 = $("<p>").attr("id", "humidity").text("Humidity: " + humidity + "%");
//   var newP3 = $("<p>").attr("id", "windSpeed").text("Wind SPeed: " + windSpeed + " MPH");
//   var newP4 = $("<p>").attr("id", "uvIndex").text("UV Index: " + uvIndex);
//   $("#today").append(newH2, newP1, newP2, newP3, newP4);
// }

// Dynamically building the 5-Day forecast section
function forecastDeck(city) {
  $(".card-deck").empty();
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=bf44d6b9da075580825f81e2aa54cf78";
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < response.list.length; i++) {

      if (response.list[i].dt_txt[12] === "2") {
      // console.log(response.list[i]);
      var cardDate = moment.unix(response.list[i].dt).format("MM/DD/YYYY");
      var cardIcon = response.list[i].weather[0].icon;
      var cardIconURL = "http://openweathermap.org/img/w/" + cardIcon + ".png";
      var cardTemp = response.list[i].main.temp;
      var cardHum =  response.list[i].main.humidity;

      $(".card-deck").append(
      `<div class="card bg-primary">
        <div class="card-body">
          <h5 class="card-date">${cardDate}</h5>
          <img class="card-icon" alt="forecast" src="${cardIconURL}">
          <p class="card-text">Temp: ${cardTemp}</p>
        <p class="card-text">Humidity: ${cardHum}</p>
        </div>
      </div>`);
      }
    }
  });
}

//
$("#clearBtn").on("click", function(event){
  localStorage.clear();
  location.reload();  
});
