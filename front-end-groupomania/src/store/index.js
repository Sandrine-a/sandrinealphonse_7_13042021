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
    },
    userInfos: {
      email: '',
      firstname: '',
      lastname: '',
      photo: ''
    }
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status;
    },
    LOG_USER(state, user) {
      axios.defaults.headers.common['Authorization'] = user;
      state.user = user;
    },
    USER_PROFILE(state, userInfos) {
      state.userInfos = userInfos;
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
          commit('LOG_USER', 'response.data');
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_login');
          reject(error);
        })
      })
    },
    getUserProfile ({ commit }) {
      instance.get('/users/:id')
      .then((response) => {
        console.log(response.data);
        commit('USER_PROFILE', response.data);
      })
      .catch(() => {
      })
    }
  },
  modules: {
  }
})
