import storageKeys from './authStorageKeys'

export const getUserData = () =>
  JSON.parse(localStorage.getItem(storageKeys.USER_DATA))
export const isLoggedIn = () =>
  !!JSON.parse(localStorage.getItem(storageKeys.USER_DATA))
export const getAccessToken = () =>
  localStorage.getItem(storageKeys.ACCESS_TOKEN)
export const getRefreshToken = () =>
  localStorage.getItem(storageKeys.REFRESH_TOKEN)
export const userLogout = () => {
  try {
    localStorage.removeItem(storageKeys.USER_DATA)
    localStorage.removeItem(storageKeys.ACCESS_TOKEN)
    localStorage.removeItem(storageKeys.REFRESH_TOKEN)
    return true
  } catch (error) {
    return false
  }
}
