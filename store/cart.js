const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const INCREMENT_PRODUCT_COUNT = 'INCREMENT_PRODUCT_COUNT'
const DECREMENT_PRODUCT_COUNT = 'DECREMENT_PRODUCT_COUNT'
const TOGGLE_PRODUCT_SELECTION = 'TOGGLE_PRODUCT_SELECTION'
const TOGGLE_ALL_PRODUCTS_SELECTION = 'TOGGLE_ALL_PRODUCTS_SELECTION'

export const state = () => ({
  products: [],
  product_ids: [],
})

export const getters = {
  getProducts: (state) => state.products,
  getProductIds: (state) => state.product_ids,
  getTotalProductsCount: (state) =>
    state.products.reduce((total, product) => (total += product.count), 0),
  isAllProductsSelected: (state) =>
    state.products.every((prod) => prod.selected),

  getProductCount: (state) => (id) =>
    state.products.find((product) => product.id === id)?.count,
}

export const mutations = {
  [ADD_PRODUCT]: (state, payload) => {
    state.product_ids.push(payload.id)
    state.products.push({ count: 1, ...payload, selected: true })
  },
  [REMOVE_PRODUCT]: (state, id) => {
    state.products = state.products.filter((product) => product.id !== id)
    state.product_ids = state.product_ids.filter((i) => i !== id)
  },
  [INCREMENT_PRODUCT_COUNT]: (state, id) => {
    const cartProduct = state.products.find((p) => p.id === id)
    if (cartProduct) {
      cartProduct.count += 1
    }
  },
  [DECREMENT_PRODUCT_COUNT]: (state, id) => {
    const cartProduct = state.products.find((p) => p.id === id)
    if (cartProduct && cartProduct.count > 1) cartProduct.count -= 1
  },
  [TOGGLE_PRODUCT_SELECTION]: (state, id) => {
    const found = state.products.find((p) => p.id === id)
    if (found) found.selected = !found.selected
  },
  [TOGGLE_ALL_PRODUCTS_SELECTION]: (state) => {
    const isAllSelected = state.products.every((prod) => prod.selected)
    state.products.forEach((product) => (product.selected = !isAllSelected))
  },
}

export const actions = {}
