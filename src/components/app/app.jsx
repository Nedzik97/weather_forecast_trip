import { FormCreateTrip } from '../form-create-trip/form-create-trip';
import { useFormContext } from '../../context/form-context';
import { WeatherDuringTrip } from '../weather-during-trip.jsx/weather-during-trip';
import { TripList } from '../trip-list/trip-list';

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
      {isFormOpen && <FormCreateTrip />}
    </div>
  );
};
