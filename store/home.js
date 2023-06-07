const SET_MAIN_PAGE_PRODUCTS = 'SET_MAIN_PAGE_PRODUCTS'

export const state = () => ({
  products: [],
})

export const getters = {
  getMainPageProducts: (state) => state.products,
}

export const mutations = {
  [SET_MAIN_PAGE_PRODUCTS]: (state, data) => {
    state.products = data
  },
}

export const actions = {
  async fetchMainProducts(ctx, payload) {
    const response = await this.$axios.get('products/main_page')
    ctx.commit(SET_MAIN_PAGE_PRODUCTS, response.data)
  },
}
