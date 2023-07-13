const SET_REGIONS = 'SET_REGIONS'
const SET_DISTRICTS = 'SET_DISTRICTS'

export const state = () => ({
  regions: [],
  cities: [],
})

export const getters = {
  GET_REGIONS: (state) => state.regions,
  GET_DISTRICTS: (state) => state.cities,
}
export const mutations = {
  [SET_REGIONS]: (state, data) => {
    state.regions = data
  },
  [SET_DISTRICTS]: (state, data) => {
    state.cities = data
  },
}
export const actions = {
  FETCH_REGIONS_LIST({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/regions/')
        .then((response) => {
          commit(SET_REGIONS, response.data.results)
          resolve(state.regions)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  FETCH_DISTRICTS_LIST({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/cities/', {
          params: {
            region: id,
          },
        })
        .then((response) => {
          commit(SET_DISTRICTS, response.data.results)
          resolve(state.cities)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  CREATE_STREAM_ORDER({ commit }, data) {
    return this.$axios.post('/orders/create_by_stream/', data)
  },
}
