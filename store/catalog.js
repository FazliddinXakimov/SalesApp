const SET_FILTER = 'SET_FILTER'
const SET_PRODUCERS = 'SET_PRODUCERS'
const SET_PRODUCTS = 'SET_PRODUCTS'

// const defaultFilters = {
//   filter: {
//     priceRange: {
//       min: 0,
//       max: 0,
//     },
//     sort: null,
//     brands: [],
//   },
// }

export const state = () => ({
  filter: {
    priceRange: {
      min: 0,
      max: 0,
    },
    sort: null,
    brands: [],
  },
  producers: [],

  products: {
    results: [],
  },
})

export const getters = {
  GET_PRODUCERS: (state) => state.producers,
  GET_FILTER: (state) => state.filter,
  GET_PRODUCTS: (state) => state.products,
}
export const mutations = {
  [SET_PRODUCERS]: (state, data) => {
    state.producers = data.map((p) => ({
      id: p.id,
      title: p.title,
      checked: false,
    }))
  },
  [SET_FILTER]: (state, filterOptions) => {
    state.filter = filterOptions
  },
  [SET_PRODUCTS]: (state, products) => {
    state.products = products
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
  FETCH_CATALOG_PRODUCTS({ state, commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/products/products_by_category/${id}/`, {
          params: {
            min: state.filter.priceRange.min,
            max: state.filter.priceRange.max,
            sort: state.filter.sort,
            brands: state.filter.brands,
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
