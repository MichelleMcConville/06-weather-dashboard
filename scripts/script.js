var date = moment().format("MM/DD/YYYY");
var cities;
var city = "";

loadCity();

// Getting cities from local storage
function loadCity() {
  cities = JSON.parse(localStorage.getItem("lscity"));
  if (cities) {
    weatherData(cities[cities.length - 1])
  } else {
    cities = [];
  }
}

//Dynamically building City List under search box
function citySearchList() {
  $("#cityList").empty();

  for (var i = 0; i < cities.length; i++) {
    var newBtn = $("<button>").attr("class", "btn cityBtn").attr("city-name", cities[i]).text(cities[i]);
    $("#cityList").prepend(newBtn);
  }
}

// Saving cities to local storage
function saveCity() {
  localStorage.setItem("lscity", JSON.stringify(cities));
}

// Loads city on refresh only add cities if not in the list
function weatherData(city) {
  $("#addCity").val("");
  if (cities.includes(city) === false) {
    cities.push(city);
    saveCity();  
  }
    citySearchList();
    weatherToday(city);
    forecastDeck(city);
}

// Today's weather block
function weatherToday(city) {
  $("#today").empty();
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=bf44d6b9da075580825f81e2aa54cf78";
  
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var name = response.name;
    var date = moment.unix(response.dt).format("MM/DD/YYYY");
    var icon = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    var uvIndex = "";

    getUvIndex(lat, lon);

    $("#today").append(
    `<div id="today" class="row">
      <h2 id="name">${name} (${date}) <img id="todayIcon" src=${iconURL}></h2>
      <p id="temp">Temperature: ${temp} \u00B0F</p>
      <p id="humidity">Humidity: ${humidity}%</p>
      <p id="windSpeed">Wind Speed: ${windSpeed} MPH</p>
      <p id="uvIndex">UV Index: ${uvIndex}</p>
    </div>`
    )
  });
}

// 
function getUvIndex(lat, lon) {
  queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=bf44d6b9da075580825f81e2aa54cf78";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var uvColor = response.value;
    if (uvColor > 0 && uvColor < 2) {
      uvSpan = "green";
    } else if (uvColor > 2 && uvColor < 6) {
      uvSpan = "yellow";
    } else if (uvColor > 6 && uvColor < 8) {
      uvSpan = "orange";
    } else if (uvColor > 8 && uvColor < 11) {
      uvSpan = "red";
    } else {
      uvSpan = "purple";
    }
  
    $("<span>").attr("id", uvSpan).text(uvColor).appendTo("#uvIndex");
  });
}

// Dynamically building the 5-Day forecast section
function forecastDeck(city) {
  $(".card-deck").empty();
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=bf44d6b9da075580825f81e2aa54cf78";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    for (var i = 0; i < response.list.length; i++) {
      if (response.list[i].dt_txt[12] === "2") {
      var cardDate = moment.unix(response.list[i].dt).format("MM/DD/YYYY");
      var cardIcon = response.list[i].weather[0].icon;
      var cardIconURL = "http://openweathermap.org/img/w/" + cardIcon + ".png";
      var cardTemp = response.list[i].main.temp;
      var cardHum =  response.list[i].main.humidity;

      $(".card-deck").append(
      `<div class="card" style="margin:4px; padding:4px;">
        <div class="card-body">
          <h5 class="card-date">${cardDate}</h5>
          <img class="card-icon" alt="forecast" src="${cardIconURL}">
          <p class="card-text">Temp: ${cardTemp} \u00B0F</p>
        <p class="card-text">Humidity: ${cardHum}%</p>
        </div>
      </div>`);
      }
    }
  });
}

// F(x) for search button click event
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  city = $("#addCity").val().trim();
  if (city === "") {
    return;
  }
  weatherData(city);
});

$(".cityBtn").on("click", function(event) {
  event.preventDefault();
  city = $(this).text().trim();
  alert("Clicked city button");
  console.log(city);
  weatherToday(city);
  forecastDeck(city);
})

//
$("#clearBtn").on("click", function(event){
  localStorage.clear();
  location.reload();  
});
