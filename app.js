import express, { json } from "express";
import https from "https";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
  const query = req.body.cityName;
  const apiKey = "e7d74924c45983a8ac5a6c1c4e903d3e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
  console.log(response.statusCode);

  response.on("data", function(data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
    res.write("<p> The weather is currently " + weatherDescription + "</p>"); 
    res.write("<img src=" + imgUrl + ">");
    res.send();
  }); 
});
});






app.listen(3000, function () {
  console.log ("server is running on port 3000");
});