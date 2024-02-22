import { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeatherForTrip, fetchTodayWeatherByCity } from '../api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import PropTypes from 'prop-types';

const WeatherContext = createContext();

const INITIAL_SELECTED_WEATHER_TRIP = {
  dayOfWeek: '2024-02-22',
  temp: '7',
  icon: 'clear-day',
  city: 'London',
};

export const TripWeatherProvider = ({ children }) => {
  const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();

  const [weatherForecast, setWeatherForecast] = useState(() => {
    const savedWeatherData = getFromLocalStorage('weatherForecast');
    return savedWeatherData ? savedWeatherData : [];
  });

  const [selectedWeatherCity, setSelectedWeatherCity] = useState(() => {
    const savedSelectedCity = getFromLocalStorage('selectedWeatherCity');
    return savedSelectedCity
      ? savedSelectedCity
      : INITIAL_SELECTED_WEATHER_TRIP;
  });

  useEffect(() => {
    const savedWeatherForecast = getFromLocalStorage('weatherForecast');
    if (savedWeatherForecast) {
      setWeatherForecast(savedWeatherForecast);
    }

    const savedSelectedWeatherTrip = getFromLocalStorage('selectedWeatherTrip');
    if (savedSelectedWeatherTrip) {
      setSelectedWeatherCity;
    }
  }, []);

  const getWeatherForTrip = (city, startDate, endDate) => {
    fetchWeatherForTrip(city, startDate, endDate).then((res) => {
      const weatherDuringTrip = res.days;
      setWeatherForecast(weatherDuringTrip);

      saveToLocalStorage('weatherForecast', weatherDuringTrip);
    });
  };

  const getWeatherByCity = (city) => {
    fetchTodayWeatherByCity(city).then((res) => {
      setSelectedWeatherCity((prev) => ({
        ...prev,
        dayOfWeek: res.days[0].datetime,
        temp: res.days[0].temp,
        icon: res.days[0].icon,
        city: res.address,
      }));

      const selectedWeatherData = {
        dayOfWeek: res.days[0].datetime,
        temp: res.days[0].temp,
        icon: res.days[0].icon,
        city: res.address,
      };

      saveToLocalStorage('selectedWeatherTrip', selectedWeatherData);
    });
  };

  return (
    <WeatherContext.Provider
      value={{
        selectedWeatherCity,
        weatherForecast,
        getWeatherForTrip,
        getWeatherByCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);

TripWeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
