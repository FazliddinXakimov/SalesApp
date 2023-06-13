const SET_ROOT_CATEGORIES = 'SET_ROOT_CATEGORIES'
const SET_CATEGORY = 'SET_CATEGORY'

export const state = () => ({
  root_categories: [],
  current_category: {},
})

export const getters = {
  GET_ROOT_CATEGORIES: (state) => state.root_categories,
  GET_CURRENT_CATEGORY: (state) => state.current_category,
}

export const mutations = {
  [SET_ROOT_CATEGORIES]: (state, data) => {
    state.root_categories = data
  },
  [SET_CATEGORY]: (state, data) => {
    state.current_category = data
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
}
