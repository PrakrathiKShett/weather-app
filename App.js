import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

// 🔑 Your OpenWeather API key
const API_KEY = "33502a0c1ef49d75bd2a41dfb097836f";

// 🌍 Default cities to display
const defaultCities = [
  "New York",
  "London",
  "Tokyo",
  "Delhi",
  "Paris",
  "Sydney",
  "Dubai",
  "Toronto",
  "Singapore",
  "Los Angeles",
  "Mumbai",
  "Berlin",
  "Rome",
  "Cape Town",
  "Moscow",
  "Beijing",
  "Seoul",
  "Bangkok",
  "San Francisco",
  "Cairo"
];

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [defaultWeather, setDefaultWeather] = useState([]);

  // Fetch weather for searched city
  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      alert("City not found!");
    }
  };

  // Fetch weather for default cities on load
  useEffect(() => {
    const getDefaultWeather = async () => {
      const data = [];
      for (let c of defaultCities) {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${API_KEY}&units=metric`
          );
          data.push(res.data);
        } catch (err) {
          console.error("Error fetching weather for", c);
        }
      }
      setDefaultWeather(data);
    };
    getDefaultWeather();
  }, []);

  return (
    <div className="app">
      <div className="weather-container">
        <h2 className="title">🌤 Global Weather App</h2>

        <div className="search-section">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="city-input"
          />
          <button onClick={fetchWeather} className="search-btn">
            Search
          </button>
        </div>

        {weather && (
          <div className="weather-info">
            <h1 className="city">{weather.name}</h1>
            <h2 className="temp">{Math.round(weather.main.temp)}°C</h2>
            <p className="condition">{weather.weather[0].description}</p>

            <div className="details">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <p>High: {Math.round(weather.main.temp_max)}°C</p>
              <p>Low: {Math.round(weather.main.temp_min)}°C</p>
            </div>
          </div>
        )}

        <h3 className="subtitle">🌎 Popular Cities</h3>
        <div className="default-cities">
          {defaultWeather.map((data) => (
            <div key={data.id} className="city-card">
              <h4>{data.name}</h4>
              <p className="city-temp">{Math.round(data.main.temp)}°C</p>
              <p className="city-condition">
                {data.weather[0].main}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
