const SET_PRODUCT = 'SET_PRODUCT'
const SET_SIMILAR_PRODUCTS = 'SET_SIMILAR_PRODUCTS'

export const state = () => ({
  product: {
    brand: {},
    category: {},
    seller: {},
    properties: [],
  },
  similar_products: {
    result: [],
  },
})
export const getters = {
  GET_PRODUCT: (state) => state.product,
  GET_SIMILAR_PRODUCTS: (state) => state.similar_products,
}
export const mutations = {
  [SET_PRODUCT]: (state, product) => {
    if (product.video) {
      const medias = product.images
      state.product = {
        ...product,
        images: [product.video, ...medias],
      }
    } else state.product = product
  },
  [SET_SIMILAR_PRODUCTS]: (state, data) => {
    state.similar_products = data
  },
}
export const actions = {
  FETCH_PRODUCT_DETAIL({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/products/product_detail_for_client/${id}/`)
        .then((response) => {
          commit(SET_PRODUCT, response.data)
          resolve(state.product)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  FETCH_PRODUCT_SIMILAR_PRODUCTS({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/products/products_by_category/${id}/`)
        .then((response) => {
          commit(SET_SIMILAR_PRODUCTS, response.data)
          resolve(state.similar_products)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
