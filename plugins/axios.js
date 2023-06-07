export default function ({ $axios, store, redirect }) {
  $axios.interceptors.request.use((config) => {
    const token = store.state.auth?.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      config.headers.Authorization = ''
    }
    return config
  })
  $axios.interceptors.response.use(
    (config) => {
      return config
    },
    async (error) => {
      const originalRequest = error.config
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry &&
        !error.config.login
      ) {
        originalRequest._isRetry = true
        try {
          const response = await fetch($axios.baseURL, {
            withCredentials: true,
          })

          if (response.status === 200) {
            const data = await response.json()

            store.commit('auth/setToken', data.data?.accessToken)
            store.commit('auth/setUserData', data.data?.user || {})

            return $axios.request(originalRequest)
          }
        } catch (err) {
          store.commit('auth/logout')
          return $axios.request(originalRequest)
        }
      }
      throw error
    }
  )
}
