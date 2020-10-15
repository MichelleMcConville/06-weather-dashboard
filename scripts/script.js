var date = moment().format("MM/DD/YYYY");
var cities = "Belton";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cities + "&APPID=bf44d6b9da075580825f81e2aa54cf78";
console.log(queryURL);

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

//F(x) for search button click event
$("searchBox").on("click", function(event) {
  event.preventDefault();
  var city = $("#addCity").val().trim();
  cities.push(city);
  citiesList();
});
$(document).on("click", ".searchBox", citiesList);
citiesList();


$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
    $("#name").text(response.name + " (Date) - Icon");
    $("#temp").text("Temperature: " + response.main.temp);
    $("#humidity").text("Humidity: " + response.main.humidity);
    $("#windSpeed").text("Wind Speed: " + response.wind.speed);
    $("#uvIndex").text("UV Index: " + response.main.temp);
    console.log(response);
    console.log(response.main.name);
});


{/* <section class="container">

    <div id="today" class="row">
        <h2>City (Date)</h2>
        <p id="temp">Temp</p>
        <p id="humidity">Humidity</p>
        <p id="windSpeed">Wind Speed</p>
        <p id="uvIndex">UV INdex</p>
    </div> */}
