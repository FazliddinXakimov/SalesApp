const SET_PAGE = 'SET_PAGE'
const SET_FILTER = 'SET_FILTER'
const SET_PRODUCERS = 'SET_PRODUCERS'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_FILTER_ITEM = 'SET_FILTER_ITEM'
// const SET_BRANDS = "SET_BRANDS"
const SET_FILTER_BRANDS_ITEM = 'SET_FILTER_BRANDS_ITEM'

export const state = () => ({
  filter: {
    minPrice: 0,
    maxPrice: 10000000,
    sort: null,
    brands: [],
    page_size: 8,
  },
  page: 1,
  producers: [],

  products: {
    count: 0,
    next: 0,
    results: [],
    seller_data: {},
  },
})

export const getters = {
  GET_PRODUCERS: (state) => state.producers,
  GET_FILTER: (state) => state.filter,
  GET_PRODUCTS: (state) => state.products,
  IS_INCLUDES_BRAND: (state) => (brand) => {
    return state.filter.brands.includes(brand)
  },
  GET_PAGE: (state) => state.page,
}
export const mutations = {
  [SET_PRODUCERS]: (state, data) => {
    state.producers = data.map((p) => ({
      id: p.id,
      title: p.title,
      checked: false,
    }))
  },
  [SET_PAGE]: (state, data) => {
    state.page = data
  },
  [SET_FILTER]: (state, filterOptions) => {
    state.filter = { ...state.filter, filterOptions }
  },
  [SET_PRODUCTS]: (state, products) => {
    state.products = products
  },
  [SET_FILTER_BRANDS_ITEM]: (state, brandId) => {
    if (state.filter.brands.includes(brandId)) {
      state.filter.brands = state.filter.brands.filter((b) => b !== brandId)
    } else {
      state.filter.brands.push(brandId)
    }
  },
  [SET_FILTER_ITEM]: (state, { ...partialFilterOptions }) => {
    Object.keys(partialFilterOptions).forEach((key) => {
      state.filter[key] = partialFilterOptions[key]
    })
  },
}
export const actions = {
  FETCH_PRODUCERS({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/brands/', params)
        .then((response) => {
          commit(SET_PRODUCERS, response.data?.results)
          resolve(state.producers)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  FETCH_SELLER_PRODUCTS({ state, commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/sellers/seller_products/${id}/`, {
          params: {
            min_price: state.filter.minPrice,
            max_price: state.filter.maxPrice,
            sort: state.filter.sort,
            brands: state.filter.brands.join(','),
            page: state.page,
            page_size: state.filter.page_size,
          },
        })
        .then((response) => {
          commit(SET_PRODUCTS, response.data)
          resolve(state.products)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
