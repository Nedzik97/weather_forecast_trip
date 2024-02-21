import cloudyIcon from './assets/icons-weather/cloudy.png';
import partlyCloudyDayIcon from './assets/icons-weather/partly-cloudy-day.png';
import clearDayIcon from './assets/icons-weather/clear-day.png';
import rainIcon from './assets/icons-weather/rain.png';
import snowIcon from './assets/icons-weather/snow.png';
import fogIcon from './assets/icons-weather/fog-icon.png';

export const getDayOfWeek = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const options = { weekday: 'long' };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getImageUrl = (name) => {
  return new URL(`./assets/cities/${name}.jpg`, import.meta.url).href;
};

export const getWeatherIcon = (weatherType) => {
  switch (weatherType) {
    case 'partly-cloudy-day':
      return partlyCloudyDayIcon;
    case 'clear-day':
      return clearDayIcon;
    case 'cloudy':
      return cloudyIcon;
    case 'rain':
      return rainIcon;
    case 'snow':
      return snowIcon;
    case 'fog':
      return fogIcon;
    default:
      return null;
  }
};

export const formatDate = (inputDate) => {
  const year = inputDate.substring(0, 4);
  const month = inputDate.substring(5, 7);
  const day = inputDate.substring(8, 10);

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};
