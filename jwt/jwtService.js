import storageKeys from './authStorageKeys'

export default class JwtService {
  getAccessToken() {
    return localStorage.getItem(storageKeys.ACCESS_TOKEN)
  }

  getRefreshToken() {
    return localStorage.getItem(storageKeys.REFRESH_TOKEN)
  }

  getUserData() {
    return JSON.parse(localStorage.getItem(storageKeys.USER_DATA))
  }

  logout() {
    try {
      localStorage.removeItem(storageKeys.USER_DATA)
      localStorage.removeItem(storageKeys.ACCESS_TOKEN)
      localStorage.removeItem(storageKeys.REFRESH_TOKEN)

      return true
    } catch (error) {
      return false
    }
  }
}
