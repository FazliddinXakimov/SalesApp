import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: ['header', 'cart', 'favorities', 'references'],
  })(store)
}
