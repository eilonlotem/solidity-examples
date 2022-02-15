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

  authService.$watch('user', async user => {
    if (user !== undefined) {
      console.log('goes here')
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

      const token = await authService.getTokenSilently()
      // localStorage.setItem('access_token', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRnSFRzZWVNNU50aHZURXI0Yk52byJ9.eyJpc3MiOiJodHRwczovL3RyZXMtZmluYW5jZS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDYwMzYzMjUwODEzNDU0ODIyMzAiLCJhdWQiOlsiaHR0cHM6Ly9hcHAudHJlcy5maW5hbmNlIiwiaHR0cHM6Ly90cmVzLWZpbmFuY2UudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY0NDgyOTYzMSwiZXhwIjoxNjQ0OTE2MDMxLCJhenAiOiJZYm5IS3lRTEN4aFg4OGwwVTVKYmprRmtzemp2NGlZUyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJvcmdfaWQiOiJvcmdfSGplc0VXREVqeUZTcHd6MCJ9.qk3duvoZ3dhG-O6ArWytRr40VccNt60HtR7X-wd2gCXQ3W8ukLVowD5QeH1sNx-C7f5jROjqnLscVaibctlLtMzqisSsOE6IZuclkaln3IJrFRPbyslnmL14S_C9Mg8oRui7xBrZ0YiGjT5EMsC3dcoa1U-PflGC95KmnCmEB9Q7iV6UIND3Ez6d3S_90p0v3sUIZ_KjV0I2puM9sQuQzyCvvsKY0pKvnm2Ir2_Yt5V-Qk9vdYkTa2iu94mBcdzX-YOMSR6UQ4k8tdlTNvJslf9FjEid4n0cB-LrNk_sEizzw92ZMD5xue8kI8UPdcbsw8pCkx6qiuTxxQTCSnjvVg');
      localStorage.setItem('access_token', token);
      store.commit('UPDATE_USER', userToSave)
      return fn()
    }
    return fn()
  })
}
