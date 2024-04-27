import { useState, useEffect } from "react";
import weatherService from "../services/weather.js";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    weatherService
      .getCurrentWeather(
        country.capitalInfo.latlng[0],
        country.capitalInfo.latlng[1]
      )
      .then((res) => {
        setWeather(res);
      });
  }, [country]);
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map((language) => {
          return <li key={language[0]}>{language[1]}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weather ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>Temperature: {weather.main.temp} Celcius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].main}
          />
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      ) : (
        <div>no weather yet</div>
      )}
    </>
  );
};

export default CountryInfo;
