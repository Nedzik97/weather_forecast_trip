import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FormContext = createContext();

let index = 0;

export const FormProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tripsData, setTripsData] = useState({
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
  });

  const selectTrip = (id) => {
    const selectedTrip = tripsData.trips.find((trip) => trip.id === id);
    setTripsData((prev) => ({
      ...prev,
      selectedTrip,
    }));
  };

  const createTrip = (city, startDate, endDate) => {
    const newTripData = { id: ++index, city, startDate, endDate };
    setTripsData((prev) => ({
      ...prev,
      trips: [...prev.trips, newTripData],
    }));
  };

  return (
    <FormContext.Provider
      value={{ isFormOpen, setIsFormOpen, tripsData, createTrip, selectTrip }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
