const SET_PRODUCT = 'SET_PRODUCT'

export const state = () => ({
  product: {
    brand: {},
    category: {},
    seller: {},
    properties: [],
  },
})
export const getters = {
  getProduct: (state) => state.product,
}
export const mutations = {
  [SET_PRODUCT]: (state, product) => {
    state.product = product
  },
}
export const actions = {
  FETCH_PRODUCT_DETAIL({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/products/product_detail_for_client/${id}`)
        .then((response) => {
          commit(SET_PRODUCT, response.data)
          resolve(state.product)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
