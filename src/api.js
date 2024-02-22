const baseUrl =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const accountKey = `KWLSNKV6EKHEEEAVNCWQZQZZQ`;

export const fetchTodayWeatherByCity = (location) => {
  return fetch(
    `${baseUrl}/${location}/today?unitGroup=metric&include=days&key=${accountKey}&contentType=json`,
  ).then((res) => res.json());
};

export const fetchWeatherForTrip = (location, firstCity, secondCity) => {
  return fetch(
    `${baseUrl}/${location}/${firstCity}/${secondCity}?unitGroup=metric&include=days&key=${accountKey}&contentType=json`,
  ).then((res) => res.json());
};
