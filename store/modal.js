export const state = () => ({
  loginModal: false,
  cartModal: false,
  catalogModal: false,
})

export const mutations = {
  changeLoginModal: (state, data) => {
    state.loginModal = data
  },
  changeCartModal: (state, data) => {
    state.cartModal = data
  },
  changeCatalogModal: (state, data) => {
    state.catalogModal = data
  },
}
