import "./index.css";
import "./Weather.css";
import axios from "axios";

export default function App() {
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");
  }

  function receiveForecast(coordinates) {
    let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  function getTime(timestamp) {
    let date = new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${day} ${hour}:${minutes}`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);

    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `   
    <div class="col-2">
            <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width="45" />
            <div class="weather-forecast-temp">
              <span class="temp-high">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="temp-low">${Math.round(forecastDay.temp.min)}°</span>
            </div>
        </div>`;
      }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

  function receiveForecast(coordinates) {
    let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  function getTemperature(response) {
    console.log(response.data);
    let tempElement = document.querySelector("#numTemp");
    celsiusTemperature = Math.round(response.data.main.temp);
    tempElement.innerHTML = celsiusTemperature;

    let cityElement = document.querySelectorAll("#cityName");
    cityElement.innerHTML = response.data.main.name;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    let displayTime = document.querySelector("#displayTime");
    displayTime.innerHTML = getTime(response.data.dt * 1000);

    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = response.data.wind.speed;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    iconElement.setAttribute("alt", response.data.weather[0].description);

    receiveForecast(response.data.coord);

    let h1 = document.querySelector("#cityName");
    h1.innerHTML = response.data.name;
  }

  function search(city) {
    let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getTemperature);
  }

  function citySearch(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-bar");
    search(cityInput.value);
  }

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", citySearch);

  function showFahrenheitTemp(event) {
    event.preventDefault();
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
    getCelsius.classList.remove("active");
    getFahrenheit.classList.add("active");
    let temperatureNumber = document.querySelector("#numTemp");
    temperatureNumber.innerHTML = fahrenheitTemperature;
  }

  function showCelsiusTemp(event) {
    event.preventDefault();
    getCelsius.classList.add("active");
    getFahrenheit.classList.remove("active");
    let tempElement = document.querySelector("#numTemp");
    tempElement.innerHTML = celsiusTemperature;
  }

  let getFahrenheit = document.querySelector("#fahrenheit-link");
  getFahrenheit.addEventListener("click", showFahrenheitTemp);

  let getCelsius = document.querySelector("#celsius-link");
  getCelsius.addEventListener("click", showCelsiusTemp);

  let celsiusTemperature = null;

  return (
    <div className="App">
      <div className="container">
        <form id="search-form" className="mb-3">
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                id="search-bar"
                className="form-control"
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                id="submit-button"
                className="button"
              />
            </div>
          </div>
        </form>
        <div className="WeatherInfo">
          <h1 id="cityName">Los Angeles</h1>
          <ul>
            <li>
              Last updated: <span id="displayTime">Monday 23:37</span>
            </li>
            <li id="description">Raining</li>
          </ul>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="d-flex weather-temperature">
              <img src="" alt="rainy" id="icon" />
              <strong id="numTemp">13</strong>
              <span className="units">
                <a href="/" className="temp-link active" id="celsius-link">
                  °C
                </a>{" "}
                |
                <a href="/" className="temp-link" id="fahrenheit-link">
                  °F
                </a>
              </span>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>
                Humidity: <span id="humidity"></span>%
              </li>
              <li>
                Wind: <span id="wind-speed"></span> km/h
              </li>
            </ul>
          </div>
        </div>
        <div className="weather-forecast" id="weather-forecast"></div>
      </div>

      <div className="mylink">
        <a href="https://github.com/chryspham/vanilla-weather-app">
          Open-source code
        </a>
        by Chrys Pham
      </div>
      <script src="app.js"></script>
    </div>
  );
}
