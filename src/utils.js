import cloudyIcon from './assets/icons-weather/cloudy.png';
import partlyCloudyDayIcon from './assets/icons-weather/partly-cloudy-day.png';
import clearDayIcon from './assets/icons-weather/clear-day.png';
import rainIcon from './assets/icons-weather/rain.png';
import snowIcon from './assets/icons-weather/snow.png';
import fogIcon from './assets/icons-weather/fog-icon.png';

export const clientGoogleId =
  '300371647083-q22ar3j70r35f6kch3fl465qmvk3prka.apps.googleusercontent.com';

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
