const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

const saveToDatabase = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export { saveToDatabase, fetchData };
