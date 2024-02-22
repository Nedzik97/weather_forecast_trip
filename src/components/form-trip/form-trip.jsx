import { useState } from 'react';
import PropTypes from 'prop-types';
import { cities } from '../../mocks';
import { useFormContext } from '../../context/trip-context';
import { getCurrentDate, getMaxEndDate } from '../../utils-date';

import styles from './form-trip.module.scss';

const INITIAL_FORM_DATA = {
  city: '',
  startDate: '',
  endDate: '',
};

export const FormTrip = ({ setIsFormOpen }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const { createTrip } = useFormContext();

  const isFormValid = formData.city && formData.startDate && formData.endDate;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      createTrip(formData.city, formData.startDate, formData.endDate);
      setIsFormOpen(false);

      setFormData(INITIAL_FORM_DATA);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.tittleWraper}>
        <h2 className={styles.modalTittle}>Create trip</h2>
        <button
          className={styles.closeBtn}
          onClick={() => setIsFormOpen(false)}
        >
          ✕
        </button>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} lang="en">
        <label htmlFor="city" className={styles.labelCity}>
          City
          <select
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled selected hidden>
              Select a city
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="startDate" className={styles.labelStartDate}>
          Start date
          <input
            type="date"
            id="startDate"
            name="startDate"
            min={getCurrentDate()}
            value={formData.startDate}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </label>
        <label htmlFor="endDate" className={styles.labelEndDate}>
          End date
          <input
            type="date"
            id="endDate"
            name="endDate"
            min={formData.startDate}
            max={getMaxEndDate(formData.startDate)}
            value={formData.endDate}
            onChange={(e) => handleInputChange(e)}
            disabled={!formData.startDate}
            required
          />
        </label>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.buttonCancel}
            type="button"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </button>
          <button
            className={styles.buttonSave}
            type="submit"
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

FormTrip.propTypes = {
  setIsFormOpen: PropTypes.func.isRequired,
};
