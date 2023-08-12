import React, { useState } from 'react';
import CityCard from './components/citycard/citycard';
import Search from './components/search/search';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio'];

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(`${WEATHER_API_URL}/weather?q=${cityName}&appid=${WEATHER_API_KEY}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching weather data:', error);
    }
  };

  const handleCityClick = (cityName) => {
    fetchWeatherData(cityName);
  };

  const handleOnSearchChange = (searchData) => {
    // Assuming searchData contains the city name
    const cityName = searchData.label.split(',')[0]; // Extract city name from the label
    fetchWeatherData(cityName);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <div className="city-cards">
        {cities.map((city) => (
          <CityCard key={city} cityName={city} onClick={handleCityClick} />
        ))}
      </div>
      {weatherData && (
        <div>
          {/* Display weather data here */}
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          {/* You can expand this section to display more details */}
        </div>
      )}
    </div>
  );
}

export default App;
