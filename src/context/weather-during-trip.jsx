import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchWeatherDataForTrip, fetchWeatherDataForCity } from '../api';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentDay, setCurrentDay] = useState({
    dayOfWeek: '2024-02-22',
    temp: '7',
    icon: 'clear-day',
    city: 'London',
  });

  const getWeatherDuringTrip = (city, startDate, endDate) => {
    fetchWeatherDataForTrip(city, startDate, endDate).then((res) => {
      const weatherForecastDays = res.days;
      setWeatherData(weatherForecastDays);
    });
    fetchWeatherDataForCity(city).then((res) => {
      setCurrentDay((prev) => ({
        ...prev,
        dayOfWeek: res.days[0].datetime,
        temp: res.days[0].temp,
        icon: res.days[0].icon,
        city: res.address,
      }));
    });
  };

  return (
    <WeatherContext.Provider
      value={{ currentDay, weatherData, getWeatherDuringTrip }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
