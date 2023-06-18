const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {


    res.sendFile(__dirname + "/index.html");

});

app.post('/', (req, res) => {
    console.log(req.body.Latitude);
    console.log(req.body.Longitude);
    console.log('Post request received');

    const Latitude = req.body.Latitude;
    const Longitude = req.body.Longitude;

    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + Latitude + "&lon=" + Longitude + "&&units=metric&appid=594ab4a61dfa5e49db097ac176022595";

    https.get(url, (response) => {
        console.log(url);

        response.on('data', (data) => {
            const weatherdata = JSON.parse(data);
            const city = weatherdata.name;
            console.log(weatherdata.main.temp);
            console.log(weatherdata.weather[0].description);
            console.log(weatherdata.name);
            var icon = `https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`;
            res.write(`<h1>Temperature in ${city} is ${weatherdata.main.temp} </h1>`);
            res.write(`<p>Weather description in ${city} : ${weatherdata.weather[0].description} </p>`);
            res.write(`<center><img src=${icon}></center>`);
            res.send();



        })
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
