import { FormTrip } from '../form-trip/form-trip';
import { useFormContext } from '../../context/form-context';
import { WeatherDuringTrip } from '../weather-during-trip.jsx/weather-during-trip';
import { TripList } from '../trip-list/trip-list';
import { CurrentDay } from '../current-day/current-day';
import { Modal } from '../modal/modal';

import styles from './app.module.scss';

export const App = () => {
  const { isFormOpen } = useFormContext();
  return (
    <div className={styles.app}>
      <div className={styles.tripList}>
        <h1>
          Weather <span>Forecast</span>
        </h1>
        <TripList />
        <WeatherDuringTrip />
        <Modal open={isFormOpen}>{<FormTrip />}</Modal>
      </div>
      <div className={styles.currentDay}>
        <CurrentDay />
      </div>
    </div>
  );
};
