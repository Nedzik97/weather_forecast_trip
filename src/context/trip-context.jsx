import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCurrentDate, getMaxEndDate } from '../utils-date';
import PropTypes from 'prop-types';

const FormContext = createContext();
let index = 0;

const trip = {
  id: index,
  city: 'London',
  startDate: getCurrentDate(),
  endDate: getMaxEndDate(getCurrentDate()),
};

const INITIAL_TRIP = {
  tripList: [trip],
  selectedTrip: trip,
};

export const TripProvider = ({ children }) => {
  const { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } =
    useLocalStorage();

  const [trips, setTrips] = useState(() => {
    const savedTripsData = getFromLocalStorage('trips');
    return savedTripsData ? savedTripsData : INITIAL_TRIP;
  });

  const createTrip = (city, startDate, endDate) => {
    const newTripData = { id: ++index, city, startDate, endDate };
    setTrips((prev) => ({
      ...prev,
      tripList: [...prev.tripList, newTripData],
    }));
  };

  const selectTrip = (id) => {
    const selectedTrip = trips.tripList.find((trip) => trip.id === id);
    setTrips((prev) => ({
      ...prev,
      selectedTrip,
    }));
  };

  const deleteTrip = (id) => {
    const updatedTrips = trips.tripList.filter((trip) => trip.id !== id);
    setTrips((prev) => ({
      ...prev,
      tripList: updatedTrips,
    }));
  };

  useEffect(() => {
    saveToLocalStorage('trips', trips);
  }, [trips]);

  useEffect(() => {
    if (trips.tripList.length === 0) {
      removeFromLocalStorage('trips');
    }
  }, [trips]);

  return (
    <FormContext.Provider
      value={{
        trips,
        createTrip,
        selectTrip,
        deleteTrip,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

TripProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
