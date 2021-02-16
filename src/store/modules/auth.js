import axios from 'axios'
import error from '../../utils/error'

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem('jwt-token') ?? null
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('jwt-token', token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem('jwt-token')
    }
  },
  actions: {
    async login({ commit, dispatch }, user) {
      try {
        const { data } = await axios.post(URL, {
          ...user,
          returnSecureToken: true
        })
        commit('setToken', data.idToken)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        console.log(error(e.response.data.error.message))
        dispatch(
          'setMessage',
          {
            value: error(e.response.data.error.message),
            type: 'danger'
          },
          { root: true }
        )

        throw new Error(e)
      }
    }
  },
  getters: {
    token: state => {
      return state.token
    },
    isAuthenticated: (state, getters) => {
      return !!getters.token
    }
  }
}
