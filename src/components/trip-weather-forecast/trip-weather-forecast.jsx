import { useWeatherContext } from '../../context/trip-weather-context';
import { getWeatherIcon } from '../../utils';
import { getDayOfWeek } from '../../utils-date';

import styles from './trip-weather-forecast.module.scss';

export const TripWeatherForecast = () => {
  const { weatherForecast } = useWeatherContext();
  return (
    <div className={styles.weatherWeekContainer}>
      {weatherForecast.length > 0 && <p>Week</p>}
      <ul className={styles.daysDuringTrip}>
        {weatherForecast.map((day, index) => {
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
