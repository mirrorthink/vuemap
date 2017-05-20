<template>
  <div id="play-bar">
    <audio id="music" v-on:ended="onclose" v-bind:src="audioUrl" ref="audio"></audio>
    <div class="play-bar-image-container">
      <img class="play-bar-button" v-bind:src="playing?iconPause:iconPlay" @touchend="tapButton" @click="tapButton">
    </div>
    <p class="play-bar-text">{{song}}</p>
  
    <div class="close" @touchend.prevent.stop="onclose" v-on:click="onclose">X</div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'audioplay',
  props: {
    auto: {
      type: Boolean,
      default: true
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
  },

  computed: mapState(['playing', 'audioUrl','simulate']),


  methods: {
    tapButton(boolean) {
       event && event.preventDefault()
        if (this.playing) {
          this.pause()
        } else {
          this.play()
        }
    },
    playContinue() {

    },
    onclose() {
      this.$emit('close')
      this.pause();
    },
    ...mapMutations([
      'play', 'pause',// 映射 this.increment() 为 this.$store.commit('increment')
    ])
  },
  watch: {
    playing: function (val) {

      if (val) {
        console.log(this.$refs.audio.src+"aaaaaaaaaa")
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    audioUrl: function (val) {
      if (val) {
        this.$refs.audio.src = val;
 
      }

    },
    simulate: function (val) {
      if (val) {
        console.log('tapButton')
        var state='on'
         this.tapButton(state)
      }


    }
  }
}
</script>


<style scoped lang="less">
#play-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.125rem;
  background: -webkit-linear-gradient(top, #f9f9f9, #f3f3f3);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.play-bar-image-container {

  cursor: pointer;
  margin-left: 1rem;
}



.play-bar-text {
  flex-grow: 1;
  padding-left: 1rem;
  cursor: pointer;
}

.play-bar-button {
  width: 1.25rem;
  height: 1.25rem;
  padding-right: 1rem;
  cursor: pointer;
}


.close {
  font-size: 1.2rem;
  margin-right: 1.5rem;
}
</style>
