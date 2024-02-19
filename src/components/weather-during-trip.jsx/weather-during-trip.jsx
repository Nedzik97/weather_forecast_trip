import { useWeatherContext } from '../../context/weather-during-trip';
import { getDayOfWeek, getWeatherIcon } from '../../utils';

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
                {Math.round(day.tempmax)}º / {Math.round(day.tempmin)}º
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
