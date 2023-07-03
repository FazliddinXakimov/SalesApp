const SET_MAIN_PAGE_PRODUCTS = 'SET_MAIN_PAGE_PRODUCTS'
const SET_BANNERS_LIST = 'SET_BANNERS_LIST'
const SET_BRANDS = 'SET_BRANDS'

export const state = () => ({
  products: [],
  banners_list: [],
  brands: {
    count: 0,
    results: [],
  },
})

export const getters = {
  getMainPageProducts: (state) => state.products,
  GET_BANNERS_LIST: (state) => state.banners_list,
  GET_BRANDS: (state) => state.brands,
}

export const mutations = {
  [SET_MAIN_PAGE_PRODUCTS]: (state, data) => {
    state.products = data
  },
  [SET_BANNERS_LIST]: (state, data) => {
    state.banners_list = data
  },
  [SET_BRANDS]: (state, data) => {
    state.brands = data
  },
}

export const actions = {
  async FETCH_MAIN_PRODUCTS(ctx) {
    const response = await this.$axios.get('products/main_page/')
    ctx.commit(SET_MAIN_PAGE_PRODUCTS, response.data)
  },
  FETCH_BANNERS_LIST({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/banners/banner_list/')
        .then((response) => {
          commit(SET_BANNERS_LIST, response.data)
          resolve(state.banners_list)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  FETCH_BRANDS({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/brands/', params)
        .then((response) => {
          commit(SET_BRANDS, response.data)
          resolve(state.brands)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
