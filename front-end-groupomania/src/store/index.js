import { createStore } from 'vuex';

const axios = require('axios');
//Instance axios
const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export default createStore({
  state: {
    status: '',
    user: {
      userId: -1,
      token:''
    }
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status;
    },
    LOG_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    signup({ commit }, userInfos) {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve,reject) => {
        commit('SET_STATUS', '');
        instance.post('/users/signup', userInfos)
        .then((response) => {
          commit('SET_STATUS', 'signup');
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_signup');
          reject(error);
        })
      })      
    },
    login({ commit } , userInfos) {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve,reject) => {   
        instance.post('/users/login', userInfos)
        .then((response) => {
          commit('SET_STATUS', '');
          commit('SET_STATUS', 'response.data');
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_login');
          reject(error);
        })
      })
    }
  },
  modules: {
  }
})
