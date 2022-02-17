import { authGuard } from '@/auth/authGuard'

export default [

  {
    path: '/wallets',
    name: 'wallets-table',
    component: () => import('@/views/wallet/wallet-table/WalletsTable.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/wallets/add-wallet',
    name: 'wallets-add-wallet',
    component: () => import('@/views/wallet/add-wallet/AddWalletForm.vue'),
    beforeEnter: authGuard,
  },
]
