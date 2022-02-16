import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import { authGuard } from '@/auth/authGuard'
import store from '@/store'
import { getInstance } from '@/auth'
import TransactionsTable from '@/views/transactions/transaction-table/TransactionsTable.vue'
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'
import others from './routes/others'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'wallets-table' } },
    {
      path: '/wallets-table',
      name: 'wallets-table',
      component: () => import('@/views/wallet/wallet-table/WalletsTable.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/transactions-table',
      name: 'transactions-table',
      component: TransactionsTable,
      beforeEnter: authGuard,
    },
    ...apps,
    ...dashboard,
    ...pages,
    ...chartsMaps,
    ...formsTable,
    ...uiElements,
    ...others,
    {
      path: '*',
      redirect: 'error-404',
    },
    {
      path: '/login',
      name: 'auth-login',
      component: () => import('@/views/pages/authentication/Login.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
  ],
})

// router.beforeEach(async (to, _, next) => {

//   const authService = getInstance()
//   const isLoggedIn = authService.isAuthenticated

//   if (!canNavigate(to)) {
//     // Redirect to login if not logged in
//     if (!isLoggedIn) return next({ name: 'auth-login' })

//     // If logged in => not authorized
//     return next({ name: 'misc-not-authorized' })
//   }

//   console.log('to.meta.redirectIfLoggedIn', to.meta.redirectIfLoggedIn)
//   console.log('isLoggedIn', isLoggedIn)
//   // Redirect if logged in
//   if (to.meta.redirectIfLoggedIn && isLoggedIn) {
//     const userData = getUserData()
//     console.log(userData)
//     next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
//   }

//   return next()
// })

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
