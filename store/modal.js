export const state = () => ({
  loginModal: false,
  cartModal: false,
  catalogModal: false,
  orderModal: false,
  streamOrderModal: false,
  buyOneClickModal: false,
  myOrderProductModal: false,
  successModal: false,
  catalogFilterSidebar: false,
  sellerFilterSidebar: false,
  mobileSidebar: false,
})

export const mutations = {
  changeLoginModal: (state, data) => {
    state.loginModal = data
  },
  changeCartModal: (state, data) => {
    state.cartModal = data
  },
  changeMobileSidebar: (state, data) => {
    state.mobileSidebar = data
  },
  changeCatalogModal: (state, data) => {
    state.catalogModal = data
  },
  changeOrderModal: (state, data) => {
    state.orderModal = data
  },
  changeStreamOrderModal: (state, data) => {
    state.streamOrderModal = data
  },
  changeBuyOneClickModal: (state, data) => {
    state.buyOneClickModal = data
  },
  changeMyOrderProductModal: (state, data) => {
    state.myOrderProductModal = data
  },
  changeSuccessModal: (state, data) => {
    state.successModal = data
  },
  changeCatalogFilterSiderbar: (state, data) => {
    state.catalogFilterSidebar = data
  },
  changeSellerFilterSidebar: (state, data) => {
    state.sellerFilterSidebar = data
  },
}
