<template>
  <div id="play-bar">
    <audio id="music" v-on:ended="onclose" ref="audio" loop>
  
      <source v-bind:src="audio.audioUrl" type="audio/mp3">
    </audio>
    <div class="play-bar-image-container">
      <img class="play-bar-button" v-bind:src="playing?iconPause:iconPlay" @touchend="tapButton" @click="tapButton">
    </div>
    <div class="play-bar-text">
      <h5> {{audio.title}}</h5>
      <p> {{currentTime}}/{{duration}}</p>
    </div>
  
    <div class="duration">
      <span v-bind:style="{left:indicatorPosition+'%'}"></span>
    </div>
    <div class="close" @touchend.prevent.stop="onclose" v-on:click="onclose">
      <img src='/static/img/vioce_close@3x.png'>
    </div>
  
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'audioplay',
  components: {

  },
  props: {
    auto: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      iconPlay: '/static/img/voice_play@3x.png',
      iconPause: '/static/img/voice_pause@3x.png',
      coverImgUrl: '/static/img/icon-music.png',
      dataUrl: '/static/test.mp3',
      duration: '00:00',
      currentTime: '00:00',
      indicatorPosition: 0,



    }
  },

  computed: mapState(['playing', 'audio', 'simulate']),


  methods: {
    tapButton(boolean) {
      event && event.preventDefault()
      if (this.playing) {
        console.log('playing')
        this.pause()
      } else {
        this.play()
      }
    },
    playContinue() {

    },
    onclose() {
      this.$emit('close')
      //  this.pause();

      // this.audioShowContral(true);
      this.$store.dispatch({
        type: 'play',
        id: 'slient',
      }).then(() => {
        this.$refs.audio.play()
        this.audioShowContral(false);
      })

    },
    formatTime(time) {
      let s = (parseInt(time) % 60) > 9 ? (parseInt(time) % 60) : '0' + (parseInt(time) % 60);

      let m = parseInt(parseInt(time) / 60) > 9 ? parseInt(parseInt(time) / 60) : '0' + parseInt(parseInt(time) / 60);
      return m + ':' + s;
    },
    ...mapMutations([
      'play', 'pause', 'changeLoadingShow'
    ])
  },
  mounted() {
    // this.duration = parseInt(document.getElementById('music').duration)
    // this.currentTime = parseInt(document.getElementById('music').currentTime)
    //  console.log(parseInt(document.getElementById('music').duration))
    let audio = document.getElementById('music')



    audio.addEventListener('loadstart', () => {

  
      if (audio.seeking) {
        //this.changeLoadingShow(true);
      }

      //this.duration = this.formatTime(audio.duration);
      // audio.play()

    });
    audio.addEventListener('waiting', () => {


     // if (audio.seeking) {
       // this.changeLoadingShow(true);
     // }

      //this.duration = this.formatTime(audio.duration);
      // audio.play()

    });

    audio.addEventListener('canplay', () => {
      console.log('canplay')
      this.changeLoadingShow(false);
      this.duration = this.formatTime(audio.duration);
      // audio.play()

    });
    audio.addEventListener('timeupdate', () => {
      this.currentTime = this.formatTime(audio.currentTime);
      this.indicatorPosition = audio.currentTime / audio.duration * 100;



    });
  },
  watch: {
    playing: function (val) {

      if (val) {


        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    audio: function (val) {
      if (val) {
        this.$refs.audio.src = val.audioUrl;


      }

    },
    simulate: function (val) {
      if (val) {
        console.log('tapButton')
        var state = 'on'
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
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
  .play-bar-image-container {
    width: 2.29rem;
    height: 2.29rem;
    margin-left: 1.14rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}





.play-bar-text {

  padding-left: 1rem;
  cursor: pointer;
  margin-right: 2rem;
  h5 {
    font-size: 0.86rem;
    text-align: left;
    font-weight: normal;
    margin-bottom: 0.3rem;
  }
  p {
    font-size: 0.71rem;
  }
}

.duration {

  flex-grow: 1;
  border-bottom: 1px solid #ccc;
  margin-right: 2.43rem;
  position: relative;
  span {
    position: absolute;
    top: -0.465rem;
    display: inline-block;
    width: 0.93rem;
    height: 0.93rem;
    border-radius: 50%;
    background: #927028;
  }
}




.close {
  width: 1.71rem;
  height: 1.71rem;

  margin-right: 0.86rem;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
