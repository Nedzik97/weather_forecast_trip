import { useState } from 'react';
import { cities } from '../../mocks';
import { useFormContext } from '../../context/form-context';
import { getCurrentDate, getMaxEndDate } from '../../formValidation';

import styles from './form-trip.module.scss';

export const FormTrip = () => {
  const [formData, setFormData] = useState({
    city: '',
    startDate: '',
    endDate: '',
  });

  const { createTrip, setIsFormOpen } = useFormContext();

  const isFormValid = formData.city && formData.startDate && formData.endDate;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      createTrip(formData.city, formData.startDate, formData.endDate);
      setIsFormOpen(false);

      setFormData({
        city: '',
        startDate: '',
        endDate: '',
      });
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
