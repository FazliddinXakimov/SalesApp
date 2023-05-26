export const state = () => ({
  loginModal: false,
  cartModal: false,
})

export const mutations = {
  changeLoginModal: (state, data) => {
    state.loginModal = data
  },
  changeCartModal: (state, data) => {
    state.cartModal = data
  },
}
