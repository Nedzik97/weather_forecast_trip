// Функция для получения текущей даты в формате YYYY-MM-DD
export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

// Функция для получения минимальной даты окончания поездки (через 15 дней от текущей даты)
export const getMinEndDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 15);

  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

// Функция для получения максимальной даты окончания поездки (через 15 дней от текущей даты)
export const getMaxEndDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 15);

  const year = today.getFullYear() + 1; // Максимальная дата - через год от текущей даты
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};
