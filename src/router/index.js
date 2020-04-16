import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/'

Vue.use(Router)

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

let routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "main" */ '@/views/index'),
    children: [
      {
        path: '',
        name: 'index',
        components: {
          header: () => import(/* webpackChunkName: "SimpleHeader" */ '@/views/Headers/SimpleHeader.vue'),
          content: () => import(/* webpackChunkName: "IndexContent" */ '@/views/Contents/IndexContent.vue'),
          footer: () => import(/* webpackChunkName: "CommonFooter" */ '@/views/Footers/CommonFooter.vue')
        }
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  // 需要登录
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          // 登录之后直接跳转到想要的页面
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
// 跳转
router.afterEach((to, from) => {
  // console.log(to)
})

export default router
