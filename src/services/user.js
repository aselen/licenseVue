import axios from 'axios'
import store from '../store'

const client = axios.create({
  baseURL: 'http://localhost:5000',
  //withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

//request eklemek gerekiyor...

client.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (!error.response) console.log('Kullanıcı uyarılmalı')

    const {
      config,
      response: { status }
    } = error
    const originalRequest = config

    if (status === 401) {
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true
        store
          .dispatch('getNewToken')
          .then(res => {
            isAlreadyFetchingAccessToken = false

            localStorage.setItem('user', JSON.stringify(res.data))

            client.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.authToken}`

            onAccessTokenFetched(res.data.authToken)
          })
          .catch(err => {
            if (err.response.status !== 400) {
              store.dispatch('logout')
            } else {
              store.dispatch('logoutLocal')
            }
          })
      }

      const retryOriginalRequest = new Promise(resolve => {
        addSubscriber(access_token => {
          originalRequest.headers.Authorization = 'Bearer ' + access_token
          resolve(axios(originalRequest))
        })
      })
      return retryOriginalRequest
    }
    return Promise.reject(error)
  }
)

export default {
  client,
  getUser(username, password) {
    return client.post('/Login', { username: username, password: password })
  },
  getWeather() {
    return client.get('/WeatherForecast')
  },
  logout() {
    return client.get('/Logout')
  },
  getUserInfo() {
    return client.get('/User')
  },
  updateUserInfo(data) {
    return client.patch('/User', data)
  }
}
