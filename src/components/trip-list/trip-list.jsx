import { useState, useEffect, useRef } from 'react';
import { getImageUrl } from '../../utils';
import { useFormContext } from '../../context/form-context';
import { useWeatherContext } from '../../context/weather-during-trip';
import ArrowLeft from '../../assets/icons/left_icon.svg?react';
import ArrowRight from '../../assets/icons/right_icon.svg?react';

import styles from './trip-list.module.scss';

export const TripList = () => {
  const { tripsData, setIsFormOpen, selectTrip, handleDeleteTrip } =
    useFormContext();
  const { getWeatherDuringTrip } = useWeatherContext();
  const [searchTerm, setSearchTerm] = useState('');

  const ref = useRef();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const scroll = (toRight) => {
    const scrollPosition = toRight
      ? ref.current.scrollLeft + 100
      : ref.current.scrollLeft - 100;
    ref.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    tripsData.trips.forEach((trip) => {
      getWeatherDuringTrip(trip.city, trip.startDate, trip.endDate);
    });
  }, []);

  const filteredCities = [...tripsData.trips]
    .sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    })
    .filter((trip) =>
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
      <div className={styles.tripListContainerWithScroll}>
        <ul className={styles.tripList} ref={ref}>
          {filteredCities.map((trip, index) => (
            <li
              className={styles.tripItem}
              key={index}
              onClick={() => {
                getWeatherDuringTrip(trip.city, trip.startDate, trip.endDate);
                selectTrip(trip.id);
              }}
              tabIndex="0"
            >
              <img src={getImageUrl(trip.city)} alt={trip.city} />
              <h2>{trip.city}</h2>
              <span>
                {trip.startDate} - {trip.endDate}
              </span>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTrip(trip.id);
                }}
              >
                &#10006;
              </button>
            </li>
          ))}
          {tripsData.trips.length > 3 && (
            <>
              <button
                className={styles.errowLeft}
                onClick={() => scroll(false)}
              >
                <ArrowLeft />
              </button>

              <button
                className={styles.errowRight}
                onClick={() => scroll(true)}
              >
                <ArrowRight />
              </button>
            </>
          )}
        </ul>
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className={styles.createTripButton}
        >
          <span className={styles.addButton}>+</span> Add trip
        </button>
      </div>
    </div>
  );
};
