export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

export const getMaxEndDate = (startDate) => {
  let start = new Date();
  if (startDate !== null && startDate !== undefined && startDate !== '') {
    start = new Date(startDate);
  }
  const maxEnd = new Date(start);
  maxEnd.setDate(start.getDate() + 15);

  const year = maxEnd.getFullYear();
  let month = maxEnd.getMonth() + 1;
  let day = maxEnd.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};
