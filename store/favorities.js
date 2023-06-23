const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

export const state = () => ({
  products: [],
  productIds: [],
})

export const getters = {
  getFavoriteProducts: (state) => state.products,
  getFavoriteProductsIds: (state) => state.productIds,
  isHaveFavorite: (state) => (id) => state.productIds.includes(id),
  getTotalCount: (state) => state.products.length,
  
}

export const mutations = {
  [TOGGLE_FAVORITE]: (state, product) => {
    const found = state.products.find((p) => p.id === product.id)
    if (found) {
      state.products = state.products.filter((p) => p.id !== product.id)
      state.productIds = state.productIds.filter((i) => i !== product.id)
    } else {
      state.productIds.push(product.id)
      state.products.push({ ...product, favorite: true })
    }
  },
}
