import axios from "axios";

let token = sessionStorage.getItem("token")
// Function to update the token value dynamically when loggin in
export const updateToken = (newToken) => {
  token = newToken;
};
// Creating an instance of Axios with default configuration

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});
// interceptor intercepts each request before sending them so that the 
// token is updated efficiently in the header
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      'Authorization': `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

