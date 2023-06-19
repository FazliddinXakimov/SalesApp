/* eslint-disable no-console */
// import qs from 'qs'
export default function ({ $axios, store, app, error, redirect }) {
  $axios.onError((errorResponse) => {
    store.commit('changeLoading', false)
    if (errorResponse.response && errorResponse.response.status === 400) {
      console.log(errorResponse.response.data.data[0])
      return
    }
    if (errorResponse.response && errorResponse.response.status === 401) {
      store.$auth.logout()
      redirect('/')
      return errorResponse
    }
    if (errorResponse.response && errorResponse.response.status === 403) {
      return
    }
    if (errorResponse.response && errorResponse.response.status === 404) {
      return
    }
    if (errorResponse.response && errorResponse.response.status === 422) {
      error({ statusCode: 404, message: 'Post not found' })
    }
    // if (errorResponse.response && error.response.status === 500) {
    //   return;
    // }
    // if (errorResponse.message === 'Network Error') {
    // }
  })

  $axios.onRequest((req) => {
    const lang = app.store.$i18n.locale
    $axios.setHeader('Accept-Language', lang)

    req.paramsSerializer = function (params) {
      // return qs.stringify(params, { encodeValuesOnly: true })
    }
    return req
  })

  // const methods = Object.keys(allMethods)
  // methods.forEach((method) => {
  //   console.log('m', method)
  //   inject(method, allMethods[method])
  // })
}
