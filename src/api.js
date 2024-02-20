const baseUrl =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
// const accountKey = `Y4CFHZPA34MUB2VBZ7K66YGE6`;
const accountKey = `KWLSNKV6EKHEEEAVNCWQZQZZQ`;

export const fetchWeatherDataForCity = (location) => {
  return fetch(
    `${baseUrl}/${location}/today?unitGroup=metric&include=days&key=${accountKey}&contentType=json`,
  ).then((res) => res.json());
};

export const fetchWeatherDataForTrip = (location, firstCity, secondCity) => {
  return fetch(
    `${baseUrl}/${location}/${firstCity}/${secondCity}?unitGroup=metric&include=days&key=${accountKey}&contentType=json`,
  ).then((res) => res.json());
};
