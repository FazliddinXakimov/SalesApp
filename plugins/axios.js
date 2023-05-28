export default function ({ $axios, store, app, error, redirect }) {
  $axios.onError((error) => {
    store.commit('changeLoading', false)
    if (error.response && error.response.status === 400) {
      console.log(error.response.data.data[0])
      return
    }
    if (error.response && error.response.status === 401) {
      store.$auth.logout()
      redirect('/')
      return error
    }
    if (error.response && error.response.status === 403) {
      console.log("Not Authorized: Sorry, you can't access this!")
      return
    }
    if (error.response && error.response.status === 404) {
      console.log(
        "Not Found: We couldn't find what you're looking for. Please refresh and try again, or contact the support team."
      )

      error({ statusCode: 404, message: 'Post not found' })
      console.log('error.response', error.response)
      redirect('/not-found')

      return
    }
    if (error.response && error.response.status === 422) {
      console.log('Validation Error')
      return
    }
    if (error.response && error.response.status === 500) {
      console.log('Server Error: Please contact the support team.')
      return
    }
    if (error.message === 'Network Error') {
      console.log('Network Error: Check your network')
    }
    // err({ statusCode: 404, message: 'Post not found' })

    // error({ statusCode: 404, message: 'Post not found' })
  })

  $axios.onRequest((req) => {
    // const lang = app.store.$i18n.locale
    // $axios.setHeader('Accept-Language', lang)
    // $axios.setHeader('Accept-Region', regionId)
    // req.paramsSerializer = function (params) {
    //   return qs.stringify(params, { encodeValuesOnly: true })
    // }
    // return req
  })
}
