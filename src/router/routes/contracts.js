import { authGuard } from '@/auth/authGuard'

export default [

  {
    path: '/contracts',
    name: 'contracts-table',
    component: () => import('@/views/contracts/contracts-table/ContractsTable.vue'),
    beforeEnter: authGuard,
    meta: {
      pageTitle: 'Smart Contracts',
      breadcrumb: [
        {
          text: 'Home',
          to: '/'
        },
        {
          text: 'Smart Contracts',
          active: true,
        },
      ],
    },
  },
]
