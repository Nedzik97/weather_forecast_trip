import { useWeatherContext } from '../../context/weather-during-trip';
import cloudyIcon from '../../assets/icons-weather/cloudy.png';
import partlyCloudyDayIcon from '../../assets/icons-weather/partly-cloudy-day.png';
import clearDayIcon from '../../assets/icons-weather/clear-day.png';
import rainIcon from '../../assets/icons-weather/rain.png';
import snowIcon from '../../assets/icons-weather/snow.png';
import fogIcon from '../../assets/icons-weather/fog-icon.png';
import { getDayOfWeek } from '../../utils';

import styles from './weather-during-trip.module.scss';

export const WeatherDuringTrip = () => {
  const { weatherData } = useWeatherContext();
  return (
    <div className={styles.weatherWeekContainer}>
      {weatherData.length > 0 && <p>Week</p>}
      <ul className={styles.daysDuringTrip}>
        {weatherData.map((day, index) => {
          return (
            <li className={styles.day} key={index}>
              <h2 className={styles.dayOfWeek}>{getDayOfWeek(day.datetime)}</h2>
              <img
                className={styles.iconWeather}
                src={getWeatherIcon(day.icon)}
                alt={day.icon}
              />
              <span className={styles.temp}>
                {day.tempmax}º / {day.tempmin}º
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function getWeatherIcon(weatherType) {
  switch (weatherType) {
    case 'partly-cloudy-day':
      return partlyCloudyDayIcon;
    case 'clear-day':
      return clearDayIcon;
    case 'cloudy':
      return cloudyIcon;
    case 'rain':
      return rainIcon;
    case 'snow':
      return snowIcon;
    case 'fog':
      return fogIcon;
  }
}
