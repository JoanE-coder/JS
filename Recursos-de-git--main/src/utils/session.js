const STORAGE_KEY = "user";

export const saveSession = (user) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  );
};

export const getSession = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  );
};

export const removeSession = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isAuthenticated = () => {
  return !!getSession();
};