import { USER_DATA, ACCESS_TOKEN, REFRESH_TOKEN } from '@/jwt/authStorageKeys'
const SET_AUTH_TYPE = 'SET_AUTH_TYPE'
const SET_LOGOUT = 'SET_LOGOUT'
// const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN'
// const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

export const state = () => ({
  accessToken: '',
  userData: {},
  isAuthenticated: false,
  currentAuthType: 'Login',
})

export const mutations = {
  [SET_AUTH_TYPE]: (state, data) => {
    state.currentAuthType = data
  },
  [SET_LOGOUT]: (state) => {
    state.userData = {}
    state.accessToken = ''
    state.isAuthenticated = false
  },
  setToken(state, data) {
    state.isAuthenticated = true
    console.log('data', data)
    localStorage.setItem(ACCESS_TOKEN, data?.access)
    localStorage.setItem(REFRESH_TOKEN, data?.refresh)
  },
  setUserData(state, data) {
    state.userData = data
    localStorage.setItem(USER_DATA, JSON.stringify(data))
  },
  setStateToken(state, data) {
    if (data) {
      state.isAuthenticated = true
    }
    state.accessToken = data
  },
  logout(state) {
    state.isAuthenticated = false
    state.accessToken = null
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(USER_DATA)
  },
  isAuthenticated(state, data) {
    state.isAuthenticated = data
  },
}

export const actions = {
  async LOGIN({ commit }, payload) {
    const response = await this.$axios.$post('/users/login', payload, {
      login: true,
    })
    commit('setUserData', response.user_data)
    commit('setToken', {
      accessToken: response?.access,
      refreshToken: response?.refresh,
    })
  },

  CHECK_REGISTER(_, data) {
    return this.$axios.$post('/users/register', data)
  },

  CHECK_REGISTER_FORGOT_PASSWORD(_, data) {
    return this.$axios.$post('/users/forgot_password', data)
  },

  // localstorage ga save qvotti
  REGISTER({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('users/user/', payload)
        .then((response) => {
          commit('setUserData', response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  getUserIsLoggedIn: (state) => state.userData?.user_data,

  getUserData: () => {
    return JSON.parse(localStorage.getItem(USER_DATA))
  },
  getCurrentAuthType: (state) => state.currentAuthType,
}
