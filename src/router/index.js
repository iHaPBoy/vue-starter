import Vue from 'vue'
import Router from 'vue-router'
// import { getToken } from '@/utils/auth'

Vue.use(Router)

// 自动扫描导入 routes
let routes = []
const modulesContext = require.context('./', true, /^\.\/modules\/((?!\/)[\s\S])+\/index\.js$/)
modulesContext.keys().forEach(filePath => {
  const moduleConfig = modulesContext(filePath)
  routes = [...routes, ...(moduleConfig.default || moduleConfig)]
})

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_PUBLIC_PATH,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  /*
  if (to.matched.some(record => record.meta['requiresAuth'])) {
    // 访问需要登录的页面
    if (!getToken()) {
      // 跳转登录页
      next({
        name: 'userLogin',
        query: { redirect: to.fullPath }
      })
      return false
    }
  } else if (to.matched.some(record => record.meta['requiresGuest'])) {
    // 访问仅访客的页面
    if (getToken()) {
      // 跳转首页
      next({
        name: 'home'
      })
      return false
    }
  }
  */
  next()
})

// 全局后置钩子 (不会接受 next 函数也不会改变导航本身)
router.afterEach((to, from) => {
})

export default router
