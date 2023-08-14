const SET_ROOT_CATEGORIES = 'SET_ROOT_CATEGORIES'
const SET_CATEGORY = 'SET_CATEGORY'
const SET_TOP_CATEGORIES = 'SET_TOP_CATEGORIES'
const SET_FOOTER = 'SET_FOOTER '
const SET_ABOUT_PAGE_DETAIL = 'SET_ABOUT_PAGE_DETAIL'

export const state = () => ({
  root_categories: [],
  current_category: {},
  top_categories: [],
  footer: {
    public_offer: {},
    privacy_police: {},
    sell_with_us: {},
    for_advertisers: {},
    privacyPolicy: '',
    aboutPageDetail: '',
  },
})

export const getters = {
  GET_ROOT_CATEGORIES: (state) => state.root_categories,
  GET_CURRENT_CATEGORY: (state) => state.current_category,
  GET_TOP_CATEGOREIS: (state) => state.top_categories,
  GET_FOOTER: (state) => state.footer,
  GET_PRIVACY_POLICY: (state) => state.privacyPolicy,
  GET_ABOUT_PAGE_DETAIL: (state) => state.aboutPageDetail,
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
  [SET_FOOTER]: (state, data) => {
    state.footer = data
  },

  [SET_ABOUT_PAGE_DETAIL]: (state, data) => {
    state.aboutPageDetail = data
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

  FETCH_ABOUT_PAGE_DETAIL({ commit }, slug) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/references/get_pages/${slug}`)
        .then((response) => {
          commit(SET_ABOUT_PAGE_DETAIL, response.data)
          resolve(state.aboutPageDetail)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  FETCH_FOOTER({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/references/get_footer/')
        .then((response) => {
          commit(SET_FOOTER, response.data)
          resolve(state.footer)
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

  CREATE_PROPOSAL(_, data) {
    return this.$axios.post(`/sellers/create_proposal/`, data)
  },
}
