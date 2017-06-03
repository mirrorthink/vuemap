<template>
  <div>
    <transition :name="$router.app.transition">
      <router-view class="child-view"></router-view>
    </transition>
  
    <loading v-if="loading"></loading>
  
  </div>
</template>

<script>
import loading from './components/loading'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      transitionName: 'slide-left',
      loading: false,

    }
  },
  components: {
    loading
  },
  created: function () {
    // `this` 指向 vm 实例
    //this.loadingShow=false
  },
  mounted() {




  },
  computed: mapState(['loadingShow']),
  methods: {
  },
  watch: {
    '$route'(to, from) {
      const toDepth = to.path
      const fromDepth = from.path
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
    loadingShow(curVal, oldVal) {

      this.loading = curVal;
    },

  },
}
</script>


<style lang="less" scoped>
.loadingContainer{
  position: absolute;
}
.slide-left-enter-active,
.slide-right-enter-active,
{
  transition: all .3s linear 0.05s
}
.slide-right-leave-active,
.slide-left-leave-active,
{
  transition: all .3s linear 0.05s
}
.slide-right-enter {
  transform: translateX(100%)
}

.slide-left-leave-active{
 transform: translateX(20%)
}
.slide-right-leave-active {
  transform: translateX(-20%)
}
.slide-left-enter {
  transform: translateX(-100%)
}
html {
  margin: 0px;
  padding: 0px;
  position: absolute;
  top: 0px;
  left: opx;
  width: 100%;
}
</style>
