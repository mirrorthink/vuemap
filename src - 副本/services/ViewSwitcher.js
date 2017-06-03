import Vue from 'vue'
export const ViewSwitcher = {
  use: function (arr) {
    for (var i in arr) {
      Vue.use(arr[i])
    }
  },
  install: function (Vue) {
    let nextDirect = 'forward'
    Vue.prototype.nextDirection = this.nextDirection
    Vue.prototype.direction = nextDirect
    this.nextDirection(nextDirect, Vue)
  },
  nextDirection: function (val) {
    Vue.prototype.direction = val
  }
}
export default ViewSwitcher
