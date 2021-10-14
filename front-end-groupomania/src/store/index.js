import { createStore } from 'vuex';

const axios = require('axios');

//Instance axios
const instance = axios.create({
  baseURL: '"http://localhost:3000/api"'
});

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    signup({ commit }, userInfos) {
      console.log(userInfos);

      return new Promise((resolve,reject) => {
        commit;
        
        instance.post('/users/signup', userInfos)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        })
      })      
    },
    login({ commit } , userInfos) {
      console.log(userInfos);

      return new Promise((resolve,reject) => {
        commit;
        
        axios.post('instance/users/login', userInfos)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        })
      })
    }
  },
  modules: {
  }
})
