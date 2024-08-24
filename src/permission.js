import router from './router'
import { asyncRoutes } from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// import { Message } from 'element-ui'
// 前置守卫
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  // token存在
  // console.log(store.getters.token)
  if (store.getters.token) {
    // token存在且去登录页面
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else { // token存在不去登录页面
      if (!store.getters.userId) {
        const data = await store.dispatch('user/getUserInfo')
        // console.log(data.roles.menus)
        // console.log(asyncRoutes)
        const filterRoutes = asyncRoutes.filter(item => {
          return data.roles.menus.includes(item.name)
        })
        console.log(filterRoutes)
        store.commit('user/setRoutes', filterRoutes)
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      } else {
        next()
      }
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
