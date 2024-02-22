export const useLocalStorage = () => {
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  const checkLocalStorage = (key) => {
    return localStorage.getItem(key) !== null;
  };

  return {
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    checkLocalStorage,
  };
};
