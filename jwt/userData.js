import { USER_DATA, ACCESS_TOKEN, REFRESH_TOKEN } from './authStorageKeys'

export const getUserData = () => JSON.parse(localStorage.getItem(USER_DATA))
export const isLoggedIn = () => !!JSON.parse(localStorage.getItem(USER_DATA))
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN)
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN)
export const userLogout = () => {
  try {
    localStorage.removeItem(USER_DATA)
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    return true
  } catch (error) {
    return false
  }
}
