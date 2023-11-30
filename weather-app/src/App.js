import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecastInfo, setForecastInfo] = useState('');

  const apiKey = '8129711b603f61b7990132158538443b';

  function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let temp = Math.round(data.main.temp);
        let feels = Math.round(data.main.feels_like);

        const weather = {
          location: `Weather in ${data.name}`,
          temperature: `${temp}°C`,
          feelsLike: `Feels like: ${feels}°C`,
          humidity: `Humidity: ${data.main.humidity}%`,
          wind: `Wind speed: ${data.wind.speed} km/h`,
          condition: `${data.weather[0].description}`,
          iconCode: data.weather[0].icon,
        };
        setWeatherInfo(weather);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }

  function getForecast() {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(forecastURL)
      .then((response) => response.json())
      .then((data) => {
        
        const next3DaysData = data.list.filter((item, index) => index % 8 === 0 && index < 24);

        const forecast = next3DaysData.map((forecastData) => {
          let forecastTemp = Math.round(forecastData.main.temp);
          let forecastFeels = Math.round(forecastData.main.feels_like);

          return {
            date: forecastData.dt_txt.split(' ')[0],
            location: `${data.city.name}`,
            temperature: `${forecastTemp}°C`,
            feelsLike: `Feels like: ${forecastFeels}°C`,
            condition: `${forecastData.weather[0].description}`,
            iconCode: forecastData.weather[0].icon,
          };
        });

        setForecastInfo(forecast);
      })
      .catch((error) => {
        console.error('Error fetching forecast data:', error);
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input 
              type="text"
              className="form-control"
              placeholder="Weather in ..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <div className="input-group-append">
              <button 
                className="btn btn-primary" 
                type="button" 
                onClick={() => {
                  getWeather();
                  getForecast();
                }}
              >
                Search
              </button>
            </div>
          </div>

          {weatherInfo && (
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">{weatherInfo.location}</h3>
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherInfo.iconCode}@2x.png`} 
                    alt="Weather Icon"
                    className="weather-icon"
                  />
                </div>
                <p className="card-text condition">{weatherInfo.condition}</p>
                <p className="card-text temp">{weatherInfo.temperature}</p>
                <p className="card-text">{weatherInfo.feelsLike}</p>
                <p className="card-text">{weatherInfo.humidity}</p>
                <p className="card-text">{weatherInfo.wind}</p>
              </div>
            </div>
          )}

          {forecastInfo.length > 0 && (
            <div>
              <h3 className="mb-3">3-Day Forecast</h3>
              <div className="d-flex justify-content-between">
                {forecastInfo.map((forecastData) => (
                  <div key={forecastData.date} className="card">
                    <div className="card-body">
                      <h5 className="card-title">{forecastData.date}</h5>
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastData.iconCode}@2x.png`}
                          alt="Forecast Icon"
                          className="weather-icon"
                        />
                      </div>
                      <p className="card-text condition-forecast">{forecastData.condition}</p>
                      <p className="card-text temp-forecast">{forecastData.temperature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
