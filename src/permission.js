import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// 前置守卫
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nprogress.start()
  // token存在
  // console.log(store.getters.token)
  if (store.getters.token) {
    // 存在且去登录页面
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else { // 存在不去登录页面
      next()
    }
  } else { // token不存在
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
  }
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
