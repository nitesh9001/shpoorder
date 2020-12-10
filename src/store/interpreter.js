import axios from "axios";
// import store from "../store";

const setAuthToken =()=> {
  // if (token) {
  //   // Apply authorization token to every request if logged in
  //   axios.defaults.headers.common["Authorization"] = token;
  // } else {
  //   // Delete auth header
  //   delete axios.defaults.headers.common["Authorization"];
  // }

axios.interceptors.request.use(function (config) {
  //show loader
  const token = localStorage.getItem('superadmin_auth');
  config.headers.Authorization =  token;
  return config;
}, function (error) {
  console.log("Sorry did not reach")
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  //hide loader

  return response;
}, function (error) {
  return Promise.reject(error);
});
};
export default setAuthToken;