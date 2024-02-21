import { useState, useEffect } from 'react';
import { GoogleAuthComponent } from '../google-auth/google-auth';
import { useWeatherContext } from '../../context/weather-during-trip';
import { useFormContext } from '../../context/form-context';
import { getDayOfWeek, getWeatherIcon } from '../../utils';

import styles from './current-day.module.scss';

export const CurrentDay = () => {
  const { currentDay } = useWeatherContext();
  const { tripsData } = useFormContext();

  const calculateTimeLeft = () => {
    const startDate = new Date(tripsData.selectedTrip.startDate);
    const difference = startDate - new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.currentDayWrapper}>
      <GoogleAuthComponent />
      <p className={styles.dayOfWeek}>{getDayOfWeek(currentDay.dayOfWeek)}</p>
      <span>
        <img src={getWeatherIcon(currentDay.icon)} alt={currentDay.icon} />
        {Math.round(currentDay.temp)}
      </span>
      <p className={styles.currentCity}>{currentDay.city}</p>
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
