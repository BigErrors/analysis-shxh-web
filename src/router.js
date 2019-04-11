import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import(/* webpackChunkName: "home" */ './components/test2.vue')
    },
    {
      path: '/test4',
      name: 'test4',
      component: () => import(/* webpackChunkName: "home" */ './components/test4.vue')
    }
  ]
})
