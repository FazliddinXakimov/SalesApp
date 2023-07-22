export default function ({ $axios, $auth, app }) {
  $axios.onRequest((config) => {
    // Set the language header here
    config.headers['Accept-Language'] = app.i18n.locale || 'uz' // Using i18n to get the current locale
    return config
  })

  $axios.interceptors.response.use(
    (response) => response,
    // async (error) => {

    (error) => {
      if (error.response && error.response.status === 401) {
        // Access token expired, try to refresh it
        try {
          // await $auth.refreshTokens()
          // Retry the failed request with the new token
          // return $axios(error.config)
        } catch (err) {
          // Refresh token also expired or other error occurred, logout user
        }
      }
      return Promise.reject(error)
    }
  )
}
