import { useState } from 'react';
import { getImageUrl } from '../../utils';
import { useFormContext } from '../../context/form-context';
import { useWeatherContext } from '../../context/weather-during-trip';

import styles from './trip-list.module.scss';

export const TripList = () => {
  const { formData, setIsFormOpen } = useFormContext();
  const { getWeatherDuringTrip } = useWeatherContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCities = formData.filter((trip) =>
    trip.city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.tripListWrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.searchLabel}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search your trip"
            className={styles.searchInput}
          />
        </label>
      </div>
      <ul className={styles.tripListContainer}>
        {filteredCities.map((trip, index) => (
          <li
            className={styles.tripItem}
            key={index}
            onClick={() =>
              getWeatherDuringTrip(trip.city, trip.startDate, trip.endDate)
            }
            tabIndex="0"
          >
            <img src={getImageUrl(trip.city)} alt={trip.city} />
            <h2>{trip.city}</h2>
            <span>
              {trip.startDate} - {trip.endDate}
            </span>
          </li>
        ))}
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className={styles.createTripButton}
        >
          <span className={styles.addButton}>+</span> Add trip
        </button>
      </ul>
    </div>
  );
};
