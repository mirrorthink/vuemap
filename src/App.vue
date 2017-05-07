<template>
  <div id="app">
    <transition :name="$router.app.transition">
        <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  created: function () {
    // `this` 指向 vm 实例

  },
  watch: {
    '$route'(to, from) {


      const toDepth = to.path
      const fromDepth = from.path
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      console.log(this.$router.app.transition)
     
    }
  },
  mounted() {
  
    
  }
}
</script>


<style>
.slide-left-enter-active, .slide-left-leave-active,.slide-right-enter-active, .slide-right-leave-active{
  transition: all .2s ease-in
}
.slide-left-leave-active,.slide-right-enter{
  transform: translateX(100%)
}


.slide-left-enter,.slide-right-leave-active {
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
