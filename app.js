const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=jaipur&appid=d6fc3936c2f90af6cbf38861a63e5d05&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weatherData.weather[0].description;
      res.write(
        " <p>The weather is currently " + weatherDescription + ". </p>"
      );
      res.write(
        "<h1>The temperature in Jaipur is " + temp + " degrees Celcius.</h1>"
      );
      res.write("<img src=" + imageURL +">");
      res.send();
    });
  });
});

app.listen(3001, function() {
  console.log("Server is running on port 3001");
});
