const axios = require('axios');


import router from '../router';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
 
});


axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const userAccess = JSON.parse(localStorage.getItem('accesstoken')); 
  if(userAccess) {
    config.headers["Authorization"] = 'Bearer' + ' ' + userAccess.token;
  } else {
    router.push('/');
  }

  return config;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axiosInstance;