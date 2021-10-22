const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accesstoken = JSON.parse(localStorage.getItem('accesstoken'));
  if(accesstoken) {
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + accesstoken.token; 
  }
  console.log('PAGE INTERCEPTOR:');
  console.log(accesstoken);

  return config;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axiosInstance;