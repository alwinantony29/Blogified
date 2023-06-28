import axios from "axios";

const token = sessionStorage.getItem("token")

// Create an instance of Axios with default configuration
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API's base URL
  headers: {
    common: {
      'Authorization': `Bearer ${token}` // Set your token here or retrieve it from storage
    }
  }
});

// Now you can make requests using the axiosInstance, and the Authorization header will be automatically included
// axiosInstance.get('/protected')
//   .then(response => {
//     // Handle the response
//   })
//   .catch(error => {
//     // Handle the error
//   });

