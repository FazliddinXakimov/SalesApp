const SET_FILTER = 'SET_FILTER'
const SET_PRODUCERS = 'SET_PRODUCERS'

export const state = () => ({
  filter: {
    minPrice: 0,
    maxPrice: 0,
  },
  producers: [],
})

export const getters = {
  GET_PRODUCERS: (state) => state.producers,
  GET_FILTER: (state) => state.filter,
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
}
