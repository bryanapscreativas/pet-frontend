import axios from "axios";

const API = `${import.meta.env.VITE_APP_URL}`;
const instance = axios.create({
  baseURL: API,
});

instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["Accept-Language"] = "es";

instance.interceptors.request.use((config) => {
  const userSession = window.localStorage.getItem("pet-user");

  if (!userSession) return config;
  const userData = JSON.parse(userSession);

  if (config) config.headers.Authorization = `Bearer ${userData?.token}`;
  return config;
});

export default instance;
