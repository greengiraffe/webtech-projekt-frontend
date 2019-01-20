import jwtDecode from 'jwt-decode'
import store from '../store'

/**
 * Retrieve the current JSON Web Token (JWT)
 */
export function getUserToken () {
    return localStorage.getItem('user_token')
}

/**
 * Check if the provided JSON Web Token (JWT) is expired
 *
 * @param {string} userToken The JWT
 */
export function isExpired (userToken) {
    return expiresInLessThan(userToken, 0)
}

/**
 * Checks if the provided JSON Web Token (JWT) expires in less than
 * the provided seconds.
 *
 * @param {string} userToken The JWT
 * @param {number} seconds number of seconds
 */
export function expiresInLessThan (userToken, seconds) {
    const now = Date.now().valueOf() / 1000 // valueOf() to ignore timezones
    const expDate = jwtDecode(userToken).exp // in seconds
    return (expDate - now) < seconds
}

/**
 * Refresh the users JSON Web Token (JWT) before it expires.
 *
 * @param {string} userToken The JWT
 */
export async function refreshTokenIfNecessary (userToken) {
    const fiveMinutes = 300 // in seconds

    if (expiresInLessThan(userToken, fiveMinutes)) {
        await store.dispatch('user/refreshToken')
        return getUserToken()
    } else {
        return userToken
    }
}

/**
 * Login the current user & set the user data based on the
 * current JSON Web Token (JWT). If there is no login or the JWT is
 * expired, logout.
 */
export function setAuthStatus () {
    const userToken = getUserToken()

    if (userToken !== null && !isExpired(userToken)) {
        store.dispatch('user/setCurrentUser')
        store.commit('user/login')
    } else {
        store.commit('user/logout')
    }
}
