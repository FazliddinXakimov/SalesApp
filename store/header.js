const SELECT_REGION = 'SELECT_REGION'
const SET_REGIONS_LIST = 'SET_REGIONS_LIST'
const SET_LANG = 'SET_LANG'

export const state = () => ({
  selectedRegion: 1,
  regions_list: [],
  lang: 'uz',
  langOptions: [
    {
      key: 'uz',
      title: 'UZ',
    },
    {
      key: 'ru',
      title: 'РУ',
    },
  ],
})

export const getters = {
  GET_REGIONS_LIST: (state) => state.regions_list,
  GET_SELECTED_REGION: (state) =>
    state.regions_list?.find((r) => r?.id === state?.selectedRegion),

  GET_DROPDOWN_REGIONS: (state) =>
    state.regions_list?.filter((r) => r.id !== state.selectedRegion),
  GET_LANG_OPTIONS: (state) => state.langOptions,
  GET_LANG: (state) => state.lang,
}

export const mutations = {
  [SELECT_REGION]: (state, data) => {
    state.selectedRegion = data
  },
  [SET_REGIONS_LIST]: (state, data) => {
    state.regions_list = data
  },
  [SET_LANG]: (state, data) => {
    state.lang = data
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
