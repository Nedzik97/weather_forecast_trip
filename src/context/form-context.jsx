import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FormContext = createContext();

let index = 0;

export const FormProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tripsData, setTripsData] = useState(() => {
    const savedTripsData = localStorage.getItem('tripsData');
    return savedTripsData
      ? JSON.parse(savedTripsData)
      : {
          trips: [
            {
              id: index,
              city: 'London',
              startDate: '2024-02-22',
              endDate: '2024-02-30',
            },
          ],
          selectedTrip: {
            id: index,
            city: 'London',
            startDate: '2024-02-22',
            endDate: '2024-02-30',
          },
        };
  });

  const selectTrip = (id) => {
    const selectedTrip = tripsData.trips.find((trip) => trip.id === id);
    setTripsData((prev) => ({
      ...prev,
      selectedTrip,
    }));
  };

  const handleDeleteTrip = (id) => {
    const updatedTrips = tripsData.trips.filter((trip) => trip.id !== id);
    setTripsData((prev) => ({
      ...prev,
      trips: updatedTrips,
    }));
  };

  const createTrip = (city, startDate, endDate) => {
    const newTripData = { id: ++index, city, startDate, endDate };
    setTripsData((prev) => ({
      ...prev,
      trips: [...prev.trips, newTripData],
    }));
  };

  useEffect(() => {
    localStorage.setItem('tripsData', JSON.stringify(tripsData));
  }, [tripsData]);

  useEffect(() => {
    if (tripsData.trips.length === 0) {
      localStorage.removeItem('tripsData');
    }
  }, [tripsData.trips]);

  return (
    <FormContext.Provider
      value={{
        isFormOpen,
        setIsFormOpen,
        tripsData,
        createTrip,
        selectTrip,
        handleDeleteTrip,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
