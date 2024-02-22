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

export const getDayOfWeek = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const options = { weekday: 'long' };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatDate = (inputDate) => {
  return inputDate.split('-').reverse().join('.');
};

export const calculateTimeLeft = (startDate) => {
  const startDateTrip = new Date(
    new Date(startDate).getTime() - 2 * 60 * 60 * 1000,
  );
  const difference = startDateTrip - new Date();

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};
