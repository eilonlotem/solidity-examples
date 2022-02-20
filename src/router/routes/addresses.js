import { authGuard } from '@/auth/authGuard'

export default [

  {
    path: '/accounts',
    name: 'accounts-table',
    component: () => import('@/views/addresses/accounts-table/AccountsTable.vue'),
    beforeEnter: authGuard,
    meta: {
      pageTitle: 'My Accounts',
      breadcrumb: [
        {
          text: 'Home',
          to: '/'
        },
        {
          text: 'My Accounts',
          active: true,
        },
      ],
    },
  },
  {
    path: '/address-book',
    name: 'address-book-table',
    component: () => import('@/views/addresses/address-book-table/AddressBookTable.vue'),
    beforeEnter: authGuard,
    meta: {
      pageTitle: 'Address Book',
      breadcrumb: [
        {
          text: 'Home',
          to: '/'
        },
        {
          text: 'Address Book',
          active: true,
        },
      ],
    },
  },
  {
    path: '/accounts/add-account',
    name: 'accounts-add-account',
    component: () => import('@/views/addresses/add-account/AddAccountForm.vue'),
    beforeEnter: authGuard,
    meta: {
      pageTitle: 'My Accounts',
      breadcrumb: [
        {
          text: 'Home',
          to: '/'
        },
        {
          text: 'My Accounts',
          to: '/account'
        },
        {
          text: 'Add Account',
          active: true,
        },
      ],
    },
  },
]
