import axios, { AxiosError } from "axios";

const https = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // This is crucial for sending cookies with requests
});

https.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response?.status === 401) {
    window.localStorage.clear();
  }
  throw error;
});

export default https;
