import { createStore } from 'vuex';

const axios = require('axios');
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
});
//initialisation du user en localstorage
let user = localStorage.getItem('user');
if(!user) {
  user = {
    userId: -1,
    token:''
  }; 
} else {
  try {
    user = JSON.parse(user);
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + user.token; 
  } catch {
    user = {
      userId: -1,
      token:''
    };    
  }
}

export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      userId:'',
      firstname: '',
      lastname: '',
      email: ''
    }
  },
  getters: {
    getUserId: state =>  {
      return state.userInfos.userId
    }
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status;
    },
    LOG_USER(state, user) {
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + user.token; 
      localStorage.setItem('user', JSON.stringify(user));   
      state.user = user;
    },
    USER_PROFILE(state, userInfos) {
      state.userInfos = userInfos;
    },
    CHECK_USER(state, user)  {
      state.user = user;
      console.log('check user mutation:');
      console.log(user);
    }
  },
  actions: {
    signup({ commit }, userInfos) {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve,reject) => {
        commit('SET_STATUS', '');
        axiosInstance.post('/users/signup', userInfos)
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
    login({ commit }, userInfos) {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve,reject) => {   
        axiosInstance.post('/users/login', userInfos)
        .then((response) => {
          commit('SET_STATUS', '');
          commit('LOG_USER', response.data);
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_login');
          reject(error);
        })
      })
    },
    getUserParams({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      commit('CHECK_USER', user)
    },
    getUserProfile({ commit }) {
      let id = this.state.user.userId;
      axiosInstance.get(`/users/${id}`)
      .then((response) => {
        commit('USER_PROFILE', response.data);
      })
      .catch(() => {
      })
    },
    getAllPosts({ commit }) {
      console.log('posts');
      axiosInstance.get('/posts')
      .then((response) => {
        console.log(response)
        commit()
      })
      .catch(() => {
      })
    },
    
/*     getAllPosts({commit}) {
      console.log(this.state.user.userId);
      let id = this.state.user.userId;
      axiosInstance.get(`/users/${id}`)
      .then((response) => {
        console.log(response.data);
        commit('USER_PROFILE', response.data);
      })
      .catch(() => {
      }) */
  },
  modules: {
  }
})
