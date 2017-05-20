<template>
  <div class="Cointener">
    <h5>{{message}}</h5>
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  
  </div>
</template>
<script>


export default {
  name: 'loading',
  props: {
    message: {
      type: String,
    },
  },
  data() {
    return {
      iconPlay: '/static/img/icon-play.png',
      iconPause: '/static/img/icon-pause.png',
      coverImgUrl: '/static/img/icon-music.png',
      song: '图书馆',
      dataUrl: '/static/test.mp3',
    }
  }

}
</script>


<style scoped lang="less">

.Cointener {
  position: absolute;
  left: 35%;
  top: 45%;
  width: 30%;
  background: #fff;

  padding: 10px;
  z-index: 99;
  color: rgb(0, 191, 255);
  font-weight: normal;
  border-radius: 0.5rem;
}

h5 {
  margin: 0;
  padding: 0;
  text-align: center;
}

.loading {
  width:84px;
  height:7px;;
  margin: 0 auto;
}

.loading span {
  display: inline-block;
  width:7px;
  height: 100%;
  margin-right: 5px;
  border-radius: 50%;
  background: deepskyblue;
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
