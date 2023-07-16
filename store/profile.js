// const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

export const state = () => ({})
export const getters = {}
export const mutations = {}
export const actions = {
  UPDATE_USER_PASSWORD() {
    return this.$axios.post('/user/update_password/')
  },
}
