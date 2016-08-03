// global unit toggle variable
var celcius = true;

// rounding function for later
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};

function locationNotFound() {
  $("#title").text("No location info");
  $("#data").html("<h4>You'll have to look out a window.</h4>");
  $(".btn").remove();

};

function locationFound(position) {
    // set up the position variables
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    
    // some strings we'll need 
    var werkaround = "https://cors-anywhere.herokuapp.com/";
    var baseurl = "http://api.openweathermap.org/data/2.5/weather?";
    var appid = "b3283bcf9d1a301a2ac7cd4c9aba286f";
    var units = "&units=metric";
    // gets weather data
    $.getJSON(werkaround + baseurl + "lat=" + lat + "&lon=" + long + "&appid=" + appid + units, 
        update);
};

// better function to execute upon getJSON success
function update(json) {
  //var text ="You are here: " + ;
  $("#title").text("Weather");
  $("#loc").text(json.name);
  $("#cond").text(json.weather[0].main);
  $("#temp").text(round(json.main.temp, 1));
  $("#wind").text(round(json.wind.speed, 1));
  
  // set icon
  var icon = "<img  src=\"httpS://openweathermap.org/img/w/" + json.weather[0].icon + ".png\" alt=" + "\"" + json.weather[0].description + "\"" + ">";
  $("#icon").html(icon);

}

//if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(locationFound, locationNotFound);
//};


$("#change-units").on("click", function(){
  if (celcius === true) {
      // change toggle flag
      celcius = false;
    
      // get old values
      var oldTemp = $( "#temp" ).html();
      var oldSpeed = $( "#wind" ).html();
      //console.log(oldTemp);
    
      // set new values
      var newTemp = round((((oldTemp * 9) / 5) + 32), 1);
      var newSpeed = round((oldSpeed * 2.23694), 1);
      // update page
      $("#temp").text(newTemp);
      $("#wind").text(newSpeed);
      $("#temp_units").text("Farenheit");
      $("#wind_units").text("mph");
      // update(json);
  }
  else {
    celcius = true;
      // get old values
      var oldTemp = $( "#temp" ).html();
      var oldSpeed = $( "#wind" ).html();
      //console.log(oldTemp);
    
      // set new values
      var newTemp = round((((oldTemp - 32) * 5) / 9), 1) ;
      var newSpeed = round((oldSpeed * (1/2.23694)), 1);
      // update page
      $("#temp").text(newTemp);
      $("#wind").text(newSpeed);
      $("#temp_units").text("Celcius");
      $("#wind_units").text("meters per second");
    
  }
});