import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '@/services/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user') || null),
    weather: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_WEATHER(state, weather) {
      state.weather = weather
    }
  },
  actions: {
    fetchUser({ commit }, { username, password }) {
      return UserService.getUser(username, password).then(res => {
        if (res.data.authToken) {
          localStorage.setItem('user', JSON.stringify(res.data))

          UserService.client.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${res.data.authToken}`
        }
        commit('SET_USER', res.data)
      })
    },

    logout({ commit }) {
      UserService.logout().then(() => {
        commit('SET_USER', null)
        localStorage.clear()
        location.reload()
      })
    },

    logoutLocal({ commit }) {
      commit('SET_USER', null)
      localStorage.clear()
      location.reload()
    },

    getWeather({ commit }) {
      return UserService.getWeather().then(res => {
        console.log(res.data)
        commit('SET_WEATHER', res.data)
      })
    },

    getNewToken() {
      return new Promise((resolve, reject) => {
        console.log(UserService.client.defaults.headers.common['Authorization'])

        UserService.client
          .get(
            '/Refresh?' +
              'expiredToken=' +
              JSON.parse(localStorage.getItem('user')).authToken +
              '&&refreshToken=' +
              JSON.parse(localStorage.getItem('user')).refreshToken
          )
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
    loggedIn: state => {
      return state.user ? true : false
    }
  },
  modules: {}
})
