const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
router.use(bodyParser.urlencoded({ extended: true }));
const City = require("../model/City");
const url = `https://api.openweathermap.org/data/2.5/weather?q=`;
const API_KEY = "7b59ae74e94362a45add13a982e93364";
const imageUrl = "https://openweathermap.org/img/wn/";
// https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
//${cityName}&units=metric&appid=${API_KEY}

router.get("/city/:cityName", (req, res) => {
  const cityName = req.params.cityName;
  axios
    .get(url + cityName + "&units=metric&appid=" + API_KEY)
    .then((response) => {
      const data = createCity(response.data);
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      res.status(404).send("City not found");
    });
});

router.get("/cities", (req, res) => {
  getCities().then((err, cities) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(cities);
    }
  });
});

router.post("/city", async (req, res) => {
  try {
    const city = new City(req.body);
    const savedCity = await city.save();
    console.log(savedCity);
    res.status(201).json(savedCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/city/:cityName", (req, res) => {
  const cityName = req.params.cityName;
  City.findOneAndDelete({ name: cityName }).then((city)=>{
    if (!city) {
      return res.status(404).send(`City '${cityName}' not found.`);
    }
    console.log(`Deleted city '${cityName}'.`);
    return res.sendStatus(204);
  })
});

const createCity = function (cityData) {
  const newCity = new City({
    name: cityData.name,
    temperature: cityData.main.temp,
    condition: cityData.weather[0].description,
    conditionPic: `${imageUrl}${cityData.weather[0].icon}.png`,
  });
  return newCity;
};

const getCities = async function () {
  const cities = await City.find({});
  return cities;
};

module.exports = router;
