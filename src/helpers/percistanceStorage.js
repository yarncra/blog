export const setItem = (key, token) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(token));
  } catch (e) {
    console.log('errors from localStorage', e);
  }
};
export const getItem = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (e) {
    console.log('errors from localStorage', e);
  }
};
