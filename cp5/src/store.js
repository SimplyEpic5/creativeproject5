import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    questions: [],
    currentQuestion: null,
    currentComments: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setQuestion(state, question) {
      state.currentQuestion = question;
    },
    setComments(state, comments) {
      state.currentComments = comments;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async upload(context, data) {
      try {
        await axios.post('/api/questions', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getMyQuestions(context) {
      try {
        let response = await axios.get("/api/questions");
        context.commit('setQuestions', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllQuestions(context) {
      try {
        let response = await axios.get("/api/questions/all");
        context.commit('setQuestions', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getQuestion(context, data) {
      try {
        let response = await axios.get("/api/questions/question/" + data);
        context.commit('setQuestion', response.data[0]);
        return "";
      } catch (error) {
        return "";
      }
    },
    async postComment(context, data) {
      try {
        await axios.post('/api/comments', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getComments(context, data) {
      try {
        let response = await axios.get("/api/comments/comments/" + data);
        context.commit('setComments', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async deleteQuestion(context, data) {
      try {
        await axios.delete("/api/questions/" + data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async editComment(context, data){
      try {
        await axios.put('/api/comments', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async deleteComment(context, data){
      try {
        await axios.delete("/api/comments/" + data);
        return "";
      } catch (error) {
        return "";
      }
    }


  }






})
