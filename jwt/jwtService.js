import storageKeys from './authStorageKeys'

export default class JwtService {
  getAccessToken() {
    return localStorage.getItem(storageKeys.ACCESS_TOKEN)
  }

  getRefreshToken() {
    return localStorage.getItem(storageKeys.REFRESH_TOKEN)
  }

  getUserData() {
    return localStorage.getItem(storageKeys.USER_DATA)
  }
}
