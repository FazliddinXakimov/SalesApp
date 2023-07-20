// const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const SET_ORDERS = 'SET_ORDERS'
const SET_USER = 'SET_USER'

export const state = () => ({
  my_orders: [],
  user_detail: {
    city: {},
  },
})
export const getters = {
  GET_MY_ORDERS: (state) => state.my_orders,
  GET_USER_DETAIL: (state) => state.user_detail,
}
export const mutations = {
  [SET_ORDERS]: (state, data) => {
    state.my_orders = data
  },
  [SET_USER]: (state, data) => {
    state.user_detail = data
  },
}
export const actions = {
  UPDATE_USER_PASSWORD(_, data) {
    return this.$axios.post('/users/update_password/', data)
  },

  FETCH_MY_ORDERS({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/orders/my_orders/`)

        .then((response) => {
          commit(SET_ORDERS, response.data)
          resolve(state.product)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  FETCH_USER_DETAIL({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/users/client/${id}/`)

        .then((response) => {
          commit(SET_USER, response.data)
          resolve(state.user_detail)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  UPDATE_USER_DETAIL(_, { id, data }) {
    return this.$axios.patch(`/users/client/${id}/`, data)
  },
}
