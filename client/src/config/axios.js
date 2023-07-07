import axios from "axios";

const token =sessionStorage.getItem("token")

// Creating an instance of Axios with default configuration
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', //  API's base URL
  headers: {
    common: {
      'Authorization': `Bearer ${token}` // Setting token 
    }
  }
});

