import EmptyLayout from '@/layouts/EmptyLayout'

export default [
  {
    path: '/user',
    component: EmptyLayout,
    children: [
      {
        path: 'login',
        name: 'userLogin',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/user/login.vue'),
        meta: {
          requiresGuest: true
        }
      }
    ]
  }
]
