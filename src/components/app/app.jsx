import { useState } from 'react';
import { FormTrip } from '../form-trip/form-trip';
import { TripWeatherForecast } from '../trip-weather-forecast/trip-weather-forecast';
import { TripList } from '../trip-list/trip-list';
import { CurrentCity } from '../current-city/current-city';
import { Modal } from '../modal/modal';

import styles from './app.module.scss';

export const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className={styles.app}>
      <div className={styles.tripList}>
        <h1>
          Weather <span>Forecast</span>
        </h1>
        <TripList setIsFormOpen={setIsFormOpen} />
        <TripWeatherForecast />
        <Modal open={isFormOpen}>
          <div className={styles.modalBackground}>
            {<FormTrip setIsFormOpen={setIsFormOpen} />}
          </div>
        </Modal>
      </div>
      <div className={styles.currentDay}>
        <CurrentCity />
      </div>
    </div>
  );
};
