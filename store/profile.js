// const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

export const state = () => ({})
export const getters = {}
export const mutations = {}
export const actions = {
  UPDATE_USER_PASSWORD() {
    return this.$axios.post('/user/update_password/')
  },

  async FETCH_MY_ORDERS() {
    // return new Promise((resolve, reject) => {
    const response = await this.$axios.get(`/orders/my_orders/`)
    console.log('response', response)
    // .then((response) => {
    //   commit(SET_PRODUCT, response.data)
    //   resolve(state.product)
    // })
    // .catch((error) => {
    //   reject(error)
    // })
    //   })
  },
}
