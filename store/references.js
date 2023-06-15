const SET_ROOT_CATEGORIES = 'SET_ROOT_CATEGORIES'
const SET_CATEGORY = 'SET_CATEGORY'
const SET_TOP_CATEGORIES = 'SET_TOP_CATEGORIES'

export const state = () => ({
  root_categories: [],
  current_category: {},
  top_categories: [],
})

export const getters = {
  GET_ROOT_CATEGORIES: (state) => state.root_categories,
  GET_CURRENT_CATEGORY: (state) => state.current_category,
  GET_TOP_CATEGOREIS: (state) => state.top_categories,
}

export const mutations = {
  [SET_ROOT_CATEGORIES]: (state, data) => {
    state.root_categories = data
  },
  [SET_CATEGORY]: (state, data) => {
    state.current_category = data
  },
  [SET_TOP_CATEGORIES]: (state, data) => {
    state.top_categories = data
  },
}

export const actions = {
  FETCH_ROOT_CATEGORIES({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/categories/get_root_categories/', { params: payload })
        .then((response) => {
          commit(SET_ROOT_CATEGORIES, response.data)
          commit(SET_CATEGORY, response.data?.[0])
          resolve(state.root_categories)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  FETCH_TOP_CATEGORIES({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/categories/', {
          params: {
            is_top: true,
          },
        })
        .then((response) => {
          commit(SET_TOP_CATEGORIES, response.data.results)
          resolve(state.top_categories)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
