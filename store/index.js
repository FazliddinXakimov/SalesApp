const SET_MAIN_LOADING = 'SET_MAIN_LOADING'

export const state = () => ({
  isMainLoading: false,
})

export const mutations = {
  [SET_MAIN_LOADING]: (state, data) => {
    console.log("data", data)
    console.log('state.isMainLoading', state.isMainLoading)
    state.isMainLoading = data
  },
}
