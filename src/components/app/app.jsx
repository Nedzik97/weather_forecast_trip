import { FormTrip } from '../form-trip/form-trip';
import { useFormContext } from '../../context/form-context';
import { WeatherDuringTrip } from '../weather-during-trip.jsx/weather-during-trip';
import { TripList } from '../trip-list/trip-list';
import { Modal } from '../modal/modal';

import styles from './app.module.scss';

export const App = () => {
  const { isFormOpen } = useFormContext();
  return (
    <div className={styles.app}>
      <h1>
        Weather <span>Forecast</span>
      </h1>
      <TripList />
      <WeatherDuringTrip />
      <Modal open={isFormOpen}>{<FormTrip />}</Modal>
    </div>
  );
};
