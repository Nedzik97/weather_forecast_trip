import { useState, useEffect, useRef } from 'react';
import { useFormContext } from '../../context/trip-context';
import { useWeatherContext } from '../../context/trip-weather-context';
import ArrowLeft from '../../assets/icons/left_icon.svg?react';
import ArrowRight from '../../assets/icons/right_icon.svg?react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../utils';
import { formatDate } from '../../utils-date';

import styles from './trip-list.module.scss';

const scrollStep = 100;

export const TripList = ({ setIsFormOpen }) => {
  const { trips, selectTrip, deleteTrip } = useFormContext();
  const { getWeatherForTrip, getWeatherByCity } = useWeatherContext();

  const [searchTrip, setSearchTrip] = useState('');

  const scrollContainerRef = useRef();

  const handleSearchChange = (e) => {
    setSearchTrip(e.target.value);
  };

  const smoothScroll = (toRight) => {
    const scrollPosition = toRight
      ? scrollContainerRef.current.scrollLeft + scrollStep
      : scrollContainerRef.current.scrollLeft - scrollStep;
    scrollContainerRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    trips.tripList.forEach((trip) => {
      getWeatherForTrip(trip.city, trip.startDate, trip.endDate);
      getWeatherByCity(trip.city);
    });
  }, []);

  const filteredCities = [...trips.tripList]
    .sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    })
    .filter((trip) =>
      trip.city.toLowerCase().includes(searchTrip.toLowerCase()),
    );

  return (
    <div className={styles.tripListWrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.searchLabel}>
          <input
            type="text"
            value={searchTrip}
            onChange={handleSearchChange}
            placeholder="Search your trip"
            className={styles.searchInput}
          />
        </label>
      </div>
      <div className={styles.tripListContainerWithScroll}>
        <ul className={styles.tripList} ref={scrollContainerRef}>
          {filteredCities.map((trip, index) => (
            <li
              className={styles.tripItem}
              key={index}
              onClick={() => {
                getWeatherForTrip(trip.city, trip.startDate, trip.endDate);
                getWeatherByCity(trip.city);
                selectTrip(trip.id);
              }}
              tabIndex="0"
            >
              <img src={getImageUrl(trip.city)} alt={trip.city} />
              <h2>{trip.city}</h2>
              <span>
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </span>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTrip(trip.id);
                }}
              >
                &#10006;
              </button>
            </li>
          ))}
          {trips.tripList.length > 3 && (
            <>
              <button
                className={styles.errowLeft}
                onClick={() => smoothScroll(false)}
              >
                <ArrowLeft />
              </button>

              <button
                className={styles.errowRight}
                onClick={() => smoothScroll(true)}
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

TripList.propTypes = {
  setIsFormOpen: PropTypes.func.isRequired,
};
