import { useRef } from 'react';
import { useFormContext } from '../../context/form-context';
import { cities } from '../../mocks';

import styles from './form-create-trip.module.scss';

export const FormCreateTrip = () => {
  const { getDataTrip, setIsFormOpen } = useFormContext();
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      city: formRef.current.city.value,
      startDate: formRef.current.startDate.value,
      endDate: formRef.current.endDate.value,
    };

    getDataTrip(formData.city, formData.startDate, formData.endDate);
    formRef.current.reset();
    setIsFormOpen(false);
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <button
          className={styles.closeBtn}
          onClick={() => setIsFormOpen(false)}
        >
          ✕
        </button>
        <form ref={formRef} onSubmit={handleSubmit}>
          <select name="city">
            <option value="">Выберите город</option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city}
              </option>
            ))}
          </select>
          <input type="date" name="startDate" required />
          <input type="date" name="endDate" required />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsFormOpen(false)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
