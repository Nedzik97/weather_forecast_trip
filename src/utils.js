export const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long' };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getImageUrl = (name) => {
  return new URL(`./assets/cities/${name}.jpg`, import.meta.url).href;
};
