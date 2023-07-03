import qs from 'qs'

export default function ({ $axios, store, app, error, redirect }, inject) {
  // const allMethods = {
  //   products: { ...productService($axios) },
  //   // import another service here
  // }
  const lang = app.store.$i18n.locale

  $axios.setHeader('Accept-Language', lang)

  $axios.onError((errorResponse) => {
    store.commit('SET_MAIN_LOADING', false)
    if (errorResponse.response && errorResponse.response.status === 400) {
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
      return
    }
    if (errorResponse.response && error.response.status === 500) {
      return
    }

    if (errorResponse.message === 'Network Error') {
      // eslint-disable-next-line no-useless-return
      return
    }
  })

  $axios.onRequest((req) => {
    const lang = app.store.$i18n.locale
    $axios.setHeader('Accept-Language', lang)
    // $axios.setHeader('Accept-Region', regionId)
    req.paramsSerializer = function (params) {
      return qs.stringify(params, { encodeValuesOnly: true })
    }
    return req
  })
}
