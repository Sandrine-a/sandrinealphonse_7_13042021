import { createStore } from 'vuex';

//url de l'api cameras:
const urlApi = "http://localhost:3000/api";

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
        
        fetch( `${urlApi}/users/signup`, {
          method: "POST",
          body:  JSON.stringify(userInfos),
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
          }
        })
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
        
        fetch( `${urlApi}/users/login`, {
          method: "POST",
          body:  JSON.stringify(userInfos),
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
          }
        })
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
