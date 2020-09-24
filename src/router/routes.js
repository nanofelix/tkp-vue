
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login/', component: () => import('pages/Login.vue') },
      { path: 'app_mgr/', component: () => import('pages/AppManager.vue') },
      { path: 'app_mgr/list/', component: () => import('pages/AppList.vue') },
      { path: 'app_mgr/create/', component: () => import('pages/AppCreate.vue') }
    ]
  },

  // conditional redirect https://stackoverflow.com/questions/44386943/vuejs-vuerouter-conditionally-disabling-a-route

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
