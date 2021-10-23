import { createStore } from 'vuex';

import axiosInstance from '../services/axiosinstance';
const FormData = require('form-data');


export default createStore({
  state: {
    status: '',
    userAccess: {
      userId: -1,
      token: ''
    },
    userInfos: {
      userId:'',
      firstname: '',
      lastname: '',
      email: ''
    },
    allPosts: [],
    attachment: '',
    post: {
      title: '',
      content:'',
      likes:'',
      comments:'',
      id:'',
      userId:'',
      createdAt:'',
      attachment:''
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
    LOG_USER(state, userAccess) {
      state.userAccess = userAccess;
    },
    USER_PROFILE(state, userInfos) {
      state.userInfos = userInfos;
    },
    CHECK_USER(state, userAccess)  {
      state.userAccess = userAccess;
    },
    GET_ALL_POSTS(state, allPosts) {
      state.allPosts = allPosts;
      console.log(allPosts);
    },
    GET_ATTACHMENT(state, attachment) {
      state.attachment = attachment;
    },
    REMOVE_ATTACHEMENT(state, attachment) {
      console.log(state + attachment);
    },
    CREATE_POST(state, post) {
      state.post = post;
      console.log(post);
    },
    POST_TO_DELETE(state, post) {
      state.post = post;
      console.log(post);
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
          localStorage.setItem('accesstoken', JSON.stringify(response.data));
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
      const userAccess = JSON.parse(localStorage.getItem('accesstoken'));
      commit('CHECK_USER', userAccess)
    },
    getUserProfile({ commit }) {
      let id = this.state.userAccess.userId;
      axiosInstance.get(`/users/${id}`)
      .then((response) => {
        commit('USER_PROFILE', response.data);
      })
      .catch(() => {
      })
    },
    getAllPosts({ commit }) {
      axiosInstance.get('/posts')
      .then((response) => {
        commit('GET_ALL_POSTS', response.data)
      })
      .catch(() => {
      })
    },
    getPostAttachment({ commit }, attachment) {
      commit('GET_ATTACHMENT', attachment)
      console.log('COMMIT:');
    },
    sendPost({ commit }, post) {
      commit('CREATE_POST', post );
      console.log('sendPost a partir dici');
      let formData = new FormData();
      formData.append('title', post.title)
      formData.append('attachment', post.attachment)
      formData.append('userId', post.userId)

      axiosInstance.post('/posts', formData)
      .then((response) => {
        console.log(response);
      })


/*       return new Promise((resolve,reject) => {
        console.log("envoie???");
        axiosInstance.post('/posts', formData )
        .then((response) => {
          console.log(response.data);
          commit('CREATE_POST', response.data );
          commit('SET_STATUS', 'sent')
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_sendpost');
          reject(error);
        })
      })   */  
    },
    deletePost({ commit }, post) {
      //Récupération du post envoyé et commit dans post:
      commit('POST_TO_DELETE', post)
      console.log(this.state.post.id);
      console.log(this.state.userAccess.userId);
      //Puis, récupération de l'id du post dans le state
      const id = this.state.post.id;

      return new Promise((resolve,reject) => {
        axiosInstance.delete(`/posts/${id}`, {data: {userId: this.state.userAccess.userId} })
        .then((response) => {
          console.log(response.data);
          resolve(response);
        })
        .catch((error) => {reject(error)})
      })
    }
  },
  modules: {
  }
})
