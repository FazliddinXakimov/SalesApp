export default function ({ $axios, store, app, error, redirect }) {
  $axios.onError((errorResponse) => {
    store.commit('changeLoading', false)
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
    }
  })

  $axios.onRequest((req) => {
    const lang = app.store.$i18n.locale
    $axios.setHeader('Accept-Language', lang)

    req.paramsSerializer = function (params) {
      // return qs.stringify(params, { encodeValuesOnly: true })
    }
    return req
  })
}
