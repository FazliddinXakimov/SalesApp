import qs from 'qs'
import storageKeys from '@/jwt/authStorageKeys'

// import { REFRESH_TOKEN } from '@/jwt/authStorageKeys'

// function getRefreshToken() {
//   return localStorage.getItem(REFRESH_TOKEN)
// }

export default function ({ $axios, store, app, error, redirect }, inject) {
  const lang = app.store.$i18n.locale

  const isAlreadyFetchAccessToken = false
  $axios.setHeader('Accept-Language', lang)

  $axios.onError((errorResponse) => {
    // throw error,

    // let refresh = false

    const statusCode = errorResponse.response
      ? errorResponse.response.status
      : null

    store.commit('SET_MAIN_LOADING', false)
    if (statusCode === 400) {
      return
    }
    if (statusCode === 401 && isAlreadyFetchAccessToken) {
      // refresh = true

      store
        .dispatch('auth/refreshToken')
        .then((response) => {
          localStorage.setItem('accessToken', response.access)
          return $axios(errorResponse.config)
        })
        .catch((refreshError) => {
          // store.dispatch('auth/logout')
          return Promise(refreshError)
        })
    } else if (
      statusCode === 401 &&
      !isAlreadyFetchAccessToken &&
      errorResponse.response.config.url === storageKeys.refreshEndPoint
    ) {
      // logout logic must be
    }

    if (statusCode === 403) {
      return
    }
    if (statusCode === 404) {
      return
    }
    if (statusCode === 422) {
      error({ statusCode: 404, message: 'Post not found' })
      return
    }
    if (statusCode === 500) {
      return
    }

    if (errorResponse.message === 'Network Error') {
      // eslint-disable-next-line no-useless-return
      return
    }

    // refresh = false
  })

  $axios.onRequest((req) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      $axios.setHeader('Authorization', `Bearer ${accessToken}`)
    }
    const lang = app.store.$i18n.locale
    $axios.setHeader('Accept-Language', lang)

    req.paramsSerializer = function (params) {
      return qs.stringify(params, { encodeValuesOnly: true })
    }
    return req
  })
}
