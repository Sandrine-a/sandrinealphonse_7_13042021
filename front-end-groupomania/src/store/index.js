import { createStore } from 'vuex';

import axiosInstance from '../services/axiosinstance';


export default createStore({
  state: {
    status: '',
    userAccess: {
      userId: '',
      token: '',
      isAdmin: ''
    },
    userInfos: {
      userId:'',
      firstName: '',
      lastName: '',
      pPicture: '',
      email: '',
      isAdmin: ''
    },
    allPosts: [],
    allUsers: [],
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
    },
    oldPost: {
      id: '',
      title:'',
      content:'',
      attachment:'',
      userId:''
    },
    allComments: [],
    comment:{
      userId:'',
      postId:'',
      content:'',
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
    },
    GET_ALL_USERS(state, allUsers) {
      state.allUsers = allUsers;
    },
    GET_ATTACHMENT(state, attachment) {
      state.attachment = attachment;
    },
    REMOVE_ATTACHEMENT(state, attachment) {
      state.attachment = attachment
    },
    CREATE_POST(state, post) {
      state.post = post;
    },
    GET_POST(state, oldPost) {
      state.oldPost = oldPost;
    },
    POST_TO_DELETE(state, post) {
      state.post = post;
    },
    GET_ALL_COMMENTS(state, allComments) {
      state.allComments = allComments;
    },
    GET_COMMENT(state, comment) {
      state.comment = comment;
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
      commit('SET_STATUS', 'loading');
      let id = this.state.userAccess.userId;
      return new Promise((resolve,reject) => {
        axiosInstance.get(`/users/${id}`)
        .then((response) => {
          commit('SET_STATUS', 'gotProfile');
          commit('USER_PROFILE', response.data);
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_profile');
          reject(error);
        })
      })
    },
    getOnePost({ commit}, post) {
      return new Promise((resolve,reject) => {
        axiosInstance.get(`/posts/${post.id}`)
        .then((response) => {
          commit('GET_POST', response.data);
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_getPost');
          reject(error);
        })
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
    getAllComments({ commit}, posts) {
      return new Promise((resolve,reject) => {
        axiosInstance.get(`/posts/${posts.postId}/comments`)
        .then((response) => {
          commit('SET_STATUS', 'datasOk');
          commit('GET_ALL_COMMENTS', response.data)
          resolve(response);
        })
        .catch((error) => {reject(error)})
      })
    },
    sendComment({ commit }, comment) {
      return new Promise((resolve,reject) => {
        commit('GET_COMMENT', comment );
        let commentDatas = {userId: comment.userId, content: comment.content}
        
        axiosInstance.post(`/posts/${comment.postId}/comments`, commentDatas)
        .then((response) => {
          commit('GET_COMMENT', response);
          commit('SET_STATUS', 'commentSent')
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_sendComment');
          reject(error);
        })
      })  
    },
    deleteComment({ commit }, comment) {
      return new Promise((resolve,reject) => {
        axiosInstance.delete(`/posts/${comment.PostId}/comments/${comment.id}`, {comment: {postId: comment.PostId}, commentId: comment.id })
        .then((response) => {
          commit('GET_COMMENT', response);
          resolve(response);
        })
        .catch((error) => {reject(error)})
      })
    },
    getAllUsers({ commit }) {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve,reject) => {
        commit('SET_STATUS', '');
        axiosInstance.get('/users')
        .then((response) => {
          commit('GET_ALL_USERS', response.data)
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_allUsers');
          reject(error);
        })
      })  
    },
    getPostAttachment({ commit }, attachment) {
      commit('GET_ATTACHMENT', attachment)
    },
    removePostAttachment({ commit } ) {
      commit('REMOVE_ATTACHEMENT', null)
    },
    sendPost({ commit }, post) {
      return new Promise((resolve,reject) => {
        commit('CREATE_POST', post );
        let formData = new FormData();
        formData.append('title', post.title)
        formData.append('content', post.content)
        formData.append('attachment', post.attachment)
        formData.append('userId', post.userId)
        
        axiosInstance.post('/posts', formData )
        .then((response) => {
          commit('CREATE_POST', response.data );
          commit('REMOVE_ATTACHEMENT', null)
          commit('SET_STATUS', 'sent')
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_sendpost');
          reject(error);
        })
      })   
    },
    sendUpdatedPost({ commit }, post) {

      return new Promise((resolve,reject) => {
        commit('CREATE_POST', post );
        const id = post.id;

        let formData = new FormData();
        formData.append('title', post.title)
        formData.append('content', post.content)
        formData.append('attachment', post.attachment)
        formData.append('userId', post.userId);
        
        axiosInstance.put(`/posts/${id}`, formData )
        .then((response) => {
          commit('CREATE_POST', response.data );
          commit('REMOVE_ATTACHEMENT', null)
          commit('SET_STATUS', 'updateSent')
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_sendpost');
          reject(error);
        })
      }) 
    },
    deletePost({ commit }, post) {
      //Récupération du post envoyé et commit dans post:
      commit('POST_TO_DELETE', post)
      //Puis, récupération de l'id du post dans le state
      const id = this.state.post.id;
      return new Promise((resolve,reject) => {
        axiosInstance.delete(`/posts/${id}`, {data: {userId: this.state.userAccess.userId} })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {reject(error)})
      })
    },
    updateIdentity({ commit }, userInfos) {

      return new Promise((resolve,reject) => {
               
        let formData = new FormData();
        formData.append('userId', userInfos.userId)
        formData.append('lastName', userInfos.lastName)
        formData.append('firstName', userInfos.firstName)
        formData.append('pPicture', userInfos.pPicture)

        axiosInstance.put(`/users/${this.state.userAccess.userId}`, formData )
        .then((response) => {
          commit('USER_PROFILE', response.data );
          resolve(response);
        })
        .catch((error) => {
          commit('SET_STATUS', 'error_updateprofile');
          reject(error);
        })
      }) 
    },
    deleteUser({ commit }, userInfos) {
      return new Promise((resolve,reject) => {
        axiosInstance.delete(`/users/${userInfos.id}`, {data: {userId: userInfos.id} })
        .then((response) => {
          commit('SET_STATUS', 'deleted');
          resolve(response);
        })
        .catch((error) => {reject(error)})
      })
    },
    exitApp({ commit }, userAccess) {
      localStorage.clear()
      userAccess = {
        userId: -1,
        token: ''
      }
      commit('LOG_USER', userAccess)     
    }
  },
  modules: {
  }
})
