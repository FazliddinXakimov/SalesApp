import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: ['auth', 'header', 'cart'],
  })(store)
}
