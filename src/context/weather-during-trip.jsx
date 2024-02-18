import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchWeatherDataForTrip } from '../api';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);

  const getWeatherDuringTrip = (city, startDate, endDate) => {
    fetchWeatherDataForTrip(city, startDate, endDate).then((res) => {
      const weatherForecastDays = res.days;
      setWeatherData(weatherForecastDays);
    });
  };

  return (
    <WeatherContext.Provider value={{ weatherData, getWeatherDuringTrip }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
