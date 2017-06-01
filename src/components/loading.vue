<template>
  <div class="wraper" ref="wraper">
    <div class="Cointener">
  
      <div class="inner">
        <h5>{{message}}</h5>
        <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  props: {
    message: {
      type: String,
      default: ''
    },
  },
  data() {
    return {

    }
  },
  mounted() {
    let lable = document.querySelector('.lable');
    window.addEventListener('scroll', () => {


    this.$refs.wraper && ( this.$refs.wraper.style.top = document.body.scrollTop+'px') ;
  


    })



  },
}
</script>


<style scoped lang="less">
.Cointener {
  box-sizing: content-box;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  z-index: 99;
  color: rgb(0, 191, 255);
  font-weight: normal;
  border-radius: 0.5rem;
}

.inner {
  background: #fff;
  display: inline-block;
  margin: auto;
  padding: 10px 10px 17px;
  border-radius: 5px;
}

.wraper {
  display: table;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}

h5 {
  margin: 0;
  padding: 0;
  text-align: center;
}

.loading {
  width: 84px;
  height: 7px;
  margin: 0 auto;
}

.loading span {
  display: inline-block;
  width: 7px;
  height: 100%;
  margin-right: 5px;
  border-radius: 50%;
  background: rgb(146, 112, 40);
  -webkit-animation: load 1.04s ease infinite;
}

.loading span:last-child {
  margin-right: 0px;
}

@-webkit-keyframes load {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.loading span:nth-child(1) {
  -webkit-animation-delay: 0.13s;
}

.loading span:nth-child(2) {
  -webkit-animation-delay: 0.26s;
}

.loading span:nth-child(3) {
  -webkit-animation-delay: 0.39s;
}

.loading span:nth-child(4) {
  -webkit-animation-delay: 0.52s;
}

.loading span:nth-child(5) {
  -webkit-animation-delay: 0.65s;
}
</style>