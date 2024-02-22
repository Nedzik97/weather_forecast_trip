import { useState, useEffect } from 'react';
import { GoogleAuthComponent } from '../google-auth/google-auth';
import { useWeatherContext } from '../../context/trip-weather-context';
import { useFormContext } from '../../context/trip-context';
import { getWeatherIcon } from '../../utils';
import { getDayOfWeek, calculateTimeLeft } from '../../utils-date';

import styles from './current-city.module.scss';

export const CurrentCity = () => {
  const { selectedWeatherCity } = useWeatherContext();
  const { trips } = useFormContext();
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(trips.selectedTrip.startDate),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(trips.selectedTrip.startDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.currentDayWrapper}>
      <GoogleAuthComponent />
      <p className={styles.dayOfWeek}>
        {getDayOfWeek(selectedWeatherCity.dayOfWeek)}
      </p>
      <div className={styles.tempWrapper}>
        <img
          src={getWeatherIcon(selectedWeatherCity.icon)}
          alt={selectedWeatherCity.icon}
        />
        {Math.round(selectedWeatherCity.temp)}
        <span>ºC</span>
      </div>
      <p className={styles.currentCity}>{selectedWeatherCity.city}</p>
      <div className={styles.containerTime}>
        <div className={styles.item}>
          <div>{timeLeft.days}</div>
          <div>days</div>
        </div>
        <div className={styles.item}>
          <div>{timeLeft.hours}</div>
          <div>hours</div>
        </div>
        <div className={styles.item}>
          <div>{timeLeft.minutes}</div>
          <div>minutes</div>
        </div>
        <div className={styles.item}>
          <div>{timeLeft.seconds}</div>
          <div>seconds</div>
        </div>
      </div>
    </div>
  );
};
