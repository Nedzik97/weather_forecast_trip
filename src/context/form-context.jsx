import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState([]);

  const getDataTrip = (city, startDate, endDate) => {
    const newTripData = { city, startDate, endDate };
    setFormData((prevFormData) => [...prevFormData, newTripData]);
  };

  return (
    <FormContext.Provider
      value={{ isFormOpen, setIsFormOpen, formData, getDataTrip }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
