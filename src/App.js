import "./index.css";
import "./Weather.css";
import axios from "axios";

export default function App() {
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
