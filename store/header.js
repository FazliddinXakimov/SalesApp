const SELECT_REGION = 'SELECT_REGION'
const SET_REGIONS_LIST = 'SET_REGIONS_LIST'

export const state = () => ({
  selectedRegion: 1,
  regions_list: [],
})

export const getters = {
  GET_REGIONS_LIST: (state) => state.regions_list,
  GET_SELECTED_REGION: (state) =>
    state.regions_list.find((r) => r.id === state.selectedRegion),
}

export const mutations = {
  [SELECT_REGION]: (state, data) => {
    state.selectedRegion = data
  },
  [SET_REGIONS_LIST]: (state, data) => {
    state.regions_list = data
  },
}

export const actions = {
  FETCH_REGIONS_LIST({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/regions/')
        .then((response) => {
          commit(SET_REGIONS_LIST, response.data.results)
          resolve(state.regions_list)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
