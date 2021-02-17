import axios from '../../axios/request'
import store from '../index'

export default {
  namespaced: true,
  state() {
    return {
      requests: []
    }
  },
  mutations: {
    SET_REQUEST(state, requests) {
      state.requests = requests
    },
    ADD_REQUEST(state, request) {
      state.requests.push(request)
    }
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        console.log(payload)
        const token = store.getters['auth/token']
        const { data } = await axios.post(
          `/request.json?auth=${token}`,
          payload
        )

        commit('ADD_REQUEST', { ...payload, id: data.name })
        dispatch(
          'setMessage',
          {
            value: 'Заявка успешно создана',
            type: 'primary'
          },
          { root: true }
        )
      } catch (error) {
        dispatch(
          'setMessage',
          {
            value: error.message,
            type: 'danger'
          },
          { root: true }
        )
      }
    },
    async load({ commit, dispatch }) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.get(`/request.json?auth=${token}`)
        if (data) {
          const requests = Object.keys(data).map(id => ({ ...data[id], id }))
          commit('SET_REQUEST', requests)
        } else {
          commit('SET_REQUEST', [])
        }
      } catch (error) {
        console.log('Ошибка из auth/load блок catch')
        dispatch(
          'setMessage',
          {
            value: error.message,
            type: 'danger'
          },
          { root: true }
        )
      }
    },
    async loadOne({ dispatch }, id) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.get(`/request/${id}.json?auth=${token}`)

        return data
      } catch (error) {
        dispatch(
          'setMessage',
          {
            value: error.message,
            type: 'danger'
          },
          { root: true }
        )
      }
    },
    async remove({ dispatch }, id) {
      try {
        const token = store.getters['auth/token']
        await axios.delete(`/request/${id}.json?auth=${token}`)
        dispatch(
          'setMessage',
          {
            value: 'Заявка удалена',
            type: 'primary'
          },
          { root: true }
        )
      } catch (error) {
        throw Error(error)
      }
    },
    async update({ dispatch }, request) {
      try {
        const token = store.getters['auth/token']
        await axios.put(`/request/${request.id}.json?auth=${token}`, request)
        dispatch(
          'setMessage',
          {
            value: 'Заявка обновлена',
            type: 'primary'
          },
          { root: true }
        )
      } catch (error) {
        dispatch(
          'setMessage',
          {
            value: error.message,
            type: 'danger'
          },
          { root: true }
        )
      }
    }
  },
  getters: {
    requests: state => {
      return state.requests
    }
  }
}
