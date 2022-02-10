import router from '@/router'
import store from '@/store'
import { getInstance } from './index'

export const authGuard = (to, _from, next) => {
  const authService = getInstance()
  const fn = () => {
    // If the user is authenticated, continue with the route

    if (authService.isAuthenticated === true) {
      return next()
    }
    const userStorage = JSON.parse(localStorage.getItem('userData'))

    if (!userStorage) {
      router.push('/login')
      return next()
    }
    const isAlreadyLoggedIn = userStorage.isLoggedIn

    if (isAlreadyLoggedIn) {
      return next()
    }

    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } })
  }

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn()
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch('loading', loading => {
    if (loading === false) {
      return fn()
    }
  })

  authService.$watch('isAuthenticated', isAuthenticated => {
    if (isAuthenticated === true) {
      return fn()
    }
  })

  authService.$watch('user', user => {
    if (user !== undefined) {
      console.log('goes here');
      const {
        email, picture, nickname, org_id, name,
      } = user
      const userToSave = {
        email,
        avatar: picture,
        fullName: name,
        id: org_id,
        username: nickname,
        extras: { eCommerceCartItemsCount: 5 },
        ability: [{ action: 'manage', subject: 'all' }],
        role: 'admin',
        isLoggedIn: true,
      }
      localStorage.setItem('userData', JSON.stringify(userToSave))
      store.commit('UPDATE_USER', userToSave)
      return fn()
    }
    return fn()
  })
}
