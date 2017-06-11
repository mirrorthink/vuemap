<template>
    <div class="container">
        <div class="videoConstainer">
            <video ref="video" :src="message.video" width="100%" @mouseover="tapScreen" @mouseout="nottapScreen" controls></video>
        </div>
        <div class="wordConstainer">
            <popupHeader :location="message.location" :title="message.title" class="popupHeader"></popupHeader>
            <div class="content">
                <div class="detail"> {{message.dec}}</div>
            </div>
    
        </div>
    
    </div>
</template>
<script>

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

import { isMobile, formatTime } from '../services/Global'
import popupHeader from '../components/popup/popupHeader'
//console.log(this.$refs.swiperTop)
export default {
    name: 'video',
    components: {
        popupHeader

    },
    data() {
        return {
            message: {
                'id': '',
                'title': '',
                'dec': '',
                'location': [],
                'video': ''
            },
            isMobile: true


        }
    },
    created() {




    },
    mounted() {

        this.isMobile = isMobile();

        if (this.isMobile) {
            // let width = document.body.clientWidth;
            // this.$refs.video.width = parseInt(width);
        } else {
            let width = document.body.clientWidth;
            this.$refs.video.width = parseInt(width) / 3;
        }
        let id = this.$route.params.id;
        var that = this;

        this.getSightMessageById(id).then(function (data) {
            that.message = data;
      
            document.title = data.title;



        })
/*
        this.$refs.video.addEventListener('canplaythrough', () => {

            this.duration = formatTime(this.$refs.video.duration);
            // audio.play()

        });
        this.$refs.video.addEventListener('timeupdate', () => {
            this.currentTime = formatTime(this.$refs.video.currentTime);
            this.indicatorPosition = this.$refs.video.currentTime / this.$refs.video.duration * 100;
        });

        this.$refs.video.addEventListener('ended', () => {
            this.playing = false;
            this.iconShow = true;

        });*/
    },


    computed: {
        ...mapState(['sightMessages', 'languageMessages', 'audioShow', 'allShow', 'currentPosition']),
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapGetters([
            'swiperImg',
        ])
    },

    methods: {
        resize() {
            this.$refs.video.webkitRequestFullScreen();
        },
        tapButton(boolean) {
            event && event.preventDefault()
            this.iconShow = false;
            console.log(this.$refs.video.paused)
            if (this.$refs.video.paused) {
                this.$refs.video.play();
                this.playing = true;
            } else {
                this.$refs.video.pause();
                this.playing = false;
                this.iconShow = true;
            }


        },
        tapScreen() {

            event && event.preventDefault()
            setTimeout(() => {
                if (this.playing) {
                    this.iconShow = true;

                }
            }, 1000);

        },
        nottapScreen() {
            event && event.preventDefault()
            if (this.playing) {
                this.iconShow = true;

            }
        },
        isMobile() {
            let userAgentInfo = window.navigator.userAgent;
            let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
            // return Agents.find(agent => userAgentInfo.indexOf(agent) !== -1)
            Agents.find(agent => userAgentInfo.indexOf(agent) !== -1) ? (this.ua = 'mobile') : (this.ua = 'pc');


        },
        ...mapActions([
            'getSightMessageById' // 
        ]),

    },
    beforeDestroy() {

    },
    watch: {
    },
}
</script>


<style lang="less">
.container {
    min-height: 100vh;
    background: #fff;
    @media only screen and (min-width: 1025px) {
        .videoConstainer {

            display: flex!important;
            justify-content: center!important;
        }
    }
    .videoConstainer {
        position: relative;
        .videoHolder {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            .videoIcon {

                width: 2.86rem;
                height: 2.86rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .contral {
            position: absolute;
            bottom: 1.21rem;
            display: flex;
            justify-content: flex-start;
            width: 100%;
            align-items: center;
            .duration {
                flex-grow: 1;
                margin-right: 1.21rem;
                position: relative;
                margin-left: 2.36rem;
                top: 50%;
                position: relative;
                display: flex;

                div.hr1 {
                    position: absolute;
                    top: 50%;
                    color: red;

                    width: 100%;
                    background: #fff;
                    height: 1px;
                }
                div.hr2 {
                    position: absolute;
                    top: 50%;


                    width: 0;
                    background: #927028;
                    height: 1px;
                }
                span {
                    display: inline-block;
                    background: #fff;
                    position: absolute;
                    border-radius: 50%;
                    width: 0.93rem;
                    height: 0.93rem;
                    top: -0.45rem;
                }
            }
            .timeCount {
                margin-right: 0.86rem;
                p {
                    color: #fff;
                    font-size: 0.71rem;
                }
            }
            .resize {
                margin-right: 1.14rem;
                width: 1.71rem;
                height: 1.71rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .wordConstainer {
        padding: 0.86rem 1.14rem;
        background: #fff;
        .content {
            line-height: 1.62rem;
            margin-bottom: 3.43rem;
        }
        .popupHeader {
            margin-bottom: 0.86rem;
        }
    }
}
</style>