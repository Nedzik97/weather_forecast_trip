import { useRef } from 'react';
import { cities } from '../../mocks';
import { useFormContext } from '../../context/form-context';

import styles from './form-trip.module.scss';

export const FormTrip = () => {
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
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          City
          <select name="city">
            <option value="">Выберите город</option>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <label>
          Start date
          <input type="date" name="startDate" required />
        </label>
        <label>
          End date
          <input type="date" name="endDate" required />
        </label>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.buttonCancel}
            type="button"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </button>
          <button className={styles.buttonSave} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
