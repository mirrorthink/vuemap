// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import store from './store'
import VueRouter from 'vue-router'
import './assets/iconfont/iconfont.css'
import './style/common.css'
import ViewSwitcher from './services/ViewSwitcher'

export default ViewSwitcher.use([ ViewSwitcher])

import VueAwesomeSwiper from 'vue-awesome-swiper'

let routeRection = new Vue()

Vue.use(VueAwesomeSwiper)

Vue.use(VueRouter)




export const toRouter = () => {
  console.log(routeRection.direction )

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
  console.log( from.name)
  setTimeout(() => {
    let transitions = !from.name ? 'slide-left' : toRouter()
    router.app.transition = transitions
    next()
    Vue.prototype.direction = 'forward'
  }, 0)
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
