// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//全局样式
import './assets/iconfont/iconfont.css'
import './style/common.css'

import Vue from 'vue'
import App from './App'
import routes from './router'
import store from './store'
import VueRouter from 'vue-router'
import ViewSwitcher from './services/ViewSwitcher'
//第三方组件
import VueAwesomeSwiper from 'vue-awesome-swiper'

import VueLazyload from 'vue-lazyload'


export default ViewSwitcher.use([ViewSwitcher])


let routeRection = new Vue()

Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter)

Vue.use(VueLazyload, {
  error: '/static/img/error.svg',
  loading: '/static/img/loading.svg',
  listenEvents: [ 'scroll', 'mousewheel' ],
  attempt: 1
})




export const toRouter = () => {
  console.log(routeRection.direction)

  if (routeRection.direction === 'forward') {
    return 'slide-right'
  } else {
    return 'slide-left'
  }
}
const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  console.log(from.name)
  setTimeout(() => {
    let transitions = !from.name ? 'slide-left' : toRouter()
    router.app.transition = transitions
    next()
    Vue.prototype.direction = 'forward'
  }, 0)
})



/* eslint-disable no-new */
new Vue({
  //TODO
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
