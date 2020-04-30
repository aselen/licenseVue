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
    },
    SET_USER_INFO(state, userInfo) {
      state.user.name = userInfo.name
      state.user.surname = userInfo.surname
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
        commit('SET_WEATHER', res.data)
      })
    },

    getUserInfo({ commit }) {
      return UserService.getUserInfo().then(res => {
        commit('SET_USER_INFO', res.data)
      })
    },

    updateUserInfo({ commit }, { data }) {
      return UserService.updateUserInfo(data).then(res => {
        commit('SET_USER_INFO', res.data)
      })
    },

    getNewToken() {
      return new Promise((resolve, reject) => {
        //console.log('refresh')
        //console.log(UserService.client.defaults.headers.common['Authorization'])

        UserService.client
          .post('/Refresh', {
            refreshToken: JSON.parse(localStorage.getItem('user')).refreshToken,
            authToken: JSON.parse(localStorage.getItem('user')).authToken
          })
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
