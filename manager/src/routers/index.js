import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router'

// const NotFoundComponent = { template: '<p>Page not found</p>' }
// const HomeComponent = { template: '<p>Home page</p>' }
// const AboutComponent = { template: '<p>About page</p>' }

const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

// 全局前置守卫
router.beforeEach((to, from) => {
  console.info('router beforeEach:', to, from)
  return true
})

export default router
