import { createStore, createLogger } from 'vuex'
import auth from './modules/auth'
import request from './modules/request'

const plugins = []
const timeoutMsg = 5000

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state() {
    return {
      message: null,
      sidebar: false
    }
  },
  mutations: {
    SET_MESSAGE(state, message) {
      state.message = message
    },
    CLEAR_MESSAGE(state) {
      state.message = null
    },
    OPEN_SIDEBAR(state) {
      state.sidebar = true
    },
    CLOSE_SIDEBAR(state) {
      state.sidebar = false
    }
  },
  actions: {
    setMessage({ commit }, message) {
      commit('SET_MESSAGE', message)
      setTimeout(() => {
        commit('CLEAR_MESSAGE')
      }, timeoutMsg)
    }
  },
  modules: {
    auth,
    request
  }
})
