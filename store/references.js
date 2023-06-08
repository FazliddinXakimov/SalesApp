const SET_ROOT_CATEGORIES = 'SET_ROOT_CATEGORIES'

export const state = () => ({
  root_categories: [],
})

export const getters = {
  GET_ROOT_CATEGORIES: (state) => state.root_categories,
}

export const mutations = {
  [SET_ROOT_CATEGORIES]: (state, data) => {
    state.root_categories = data
  },
}

export const actions = {
  FETCH_ROOT_CATEGORIES({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/categories/get_root_categories/', { params: payload })
        .then((response) => {
          commit(SET_ROOT_CATEGORIES, response.data)
          resolve(this.exampleSamplePage)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
