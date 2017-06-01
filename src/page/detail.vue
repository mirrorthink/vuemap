<template>
    <div class="container">
        <div class="photoConstainer">
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                <swiper-slide v-for="slide in swiperImg" :key="slide.backgroundImage" v-bind:style="slide" v-on:imgChange="imgChange($event)"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="video">
                <img src="/static/img/video@3x.png" />
            </div>
            <div class="languages" v-bind:class="{ allactive: allShow}">
                <toggleBar v-bind:Messages="languageMessages" ></toggleBar>
            </div>
            <div class="count">
                <span id="activeIndex">0</span>/{{totle}}</div>
        </div>
        <div class="dec">
            <div class="row">
                <div class="left">
                    <span class="img">
                        <img src="/static/img/int_jingdian@3x.png" alt="">
                    </span>
                    <span class="title"> {{message.title}}</span>
                </div>
                <div class="right">
                    <span class="img">
                        <img src="/static/img/detail_navpoint@3x.png" alt="">
                    </span>
                    <span class="title">距离{{distant}} </span>
                </div>
                <span class="distant"> </span>
            </div>
            <div class="buttom">
                <a class="holder" v-on:click="playaudio">
                    <span class="icon">
                        <img src="/static/img/detail_vioce@3x.png" alt="">
                    </span>
                    <div class="title">语音</div>
                </a>
                <a class="holder" v-on:click="navImg">
                    <span class="icon">
                        <img src="/static/img/detail_image@3x.png" alt="">
                    </span>
                    <div class="title">图片</div>
                </a>
                <a class="holder" v-on:click="navPanoramic">
                    <span class="icon">
                        <img src="/static/img/int_360@3x.png" alt="">
                    </span>
                    <div class="title">全景</div>
                </a>
                <a class="holder">
                    <span class="icon">
                        <img src="/static/img/detail_go@3x.png" alt="">
                    </span>
                    <div class="title">去这里</div>
                </a>
            </div>
            <div class="content">
    
                <div class="detail"> {{message.dec}}</div>
    
            </div>
    
        </div>
        <audioplay v-if="audioShow" v-on:close="audioShowContral"></audioplay>
    </div>
</template>
<script>

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import toggleBar from '../components/toggleBar'
import audioplay from '../components/audioPlay'
import { computDistant } from '../services/Global'

//console.log(this.$refs.swiperTop)
export default {
    name: 'detail',
    components: {

        swiper,
        swiperSlide,
        toggleBar,
        audioplay
    },
    data() {
        return {
            view: null,
            activeIndex: 0,
            totle: 0,
            swiperOptionTop: {
                notNextTick: true,
                autoplay: 3000,
                initialSlide: 1,
                loop: true,
                //pagination: '.swiper-pagination',
                //paginationClickable: true,
                onSlideChangeStart: function (swiper) {
                    let activeIndex = document.getElementById('activeIndex')
                    activeIndex.innerHTML = ((swiper.activeIndex - 1) < 1) ? 1 : (swiper.activeIndex - 1);
                },

            },
            activeSightMessages: {
                title: '',
                dec: ''
            },
            message: {
                'id': '',
                'title': '',
                'dec': '',
                'location': []
            },
            distant: ''
        }
    },
    created() {

        this.totle = this.swiperImg.length;


    },
    mounted() {
        // console.log(this.$refs.swiperTop)
        let id = this.$route.params.id;
        var that = this;

        this.getSightMessageById(id).then(function (data) {
            that.message = data;
            that.distant = computDistant(data.location, that.currentPosition)


        })
        /*
        this.$store.dispatch({
            type: 'play',
            id: this.$route.params.id,
        })

        this.audioShowContral(true);
*/
    },


    computed: {
        ...mapState(['sightMessages', 'languageMessages', 'audioShow', 'allShow', 'currentPosition']),
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapGetters([
            'swiperImg',
        ])
    },

    methods: {
        imgChange(event) {
            this.activeIndex = event;

        },
        playaudio() {
            this.pause();
            this.audioShowContral(true);
            this.$store.dispatch({
                type: 'play',
                id: this.message.id,
            }).then(() => {
                console.log('resolve');
                this.play();
            })
        },
        navImg() {
            this.$router.push({ name: 'img', params: { id: this.message.id } })
        },
        navPanoramic() {
            this.$router.push({ name: 'panoramic', params: { id: this.message.id } })
        },

        ...mapMutations(['audioShowContral', 'play', 'pause']),
  
        ...mapActions([
            'getSightMessageById' // 
        ]),

    },
    beforeDestroy() {
        this.audioShowContral(false)
    },
    watch: {

        allShow(curVal, oldVal) {
            this.allShow = curVal;
        },
    },
}
</script>


<style lang="less">
.container{
    background: #fff;
}
.photoConstainer {
    width: 100%;
    height: 26.79rem;
    position: relative;
    top: 0px;
    left: 0px;
    .gallery-top {
        height: 26.79rem!important;
        width: 100%;
    }
    .count {
        position: absolute;
        right: 0.86rem;
        bottom: 1.14rem;
        background: rgba(69, 69, 77, 0.5);
        z-index: 4;
        font-size: 1rem;
        color: #fff;
        padding: 0.36rem 0.5rem;
        #activeIndex {
            color: #fff;
        }
    }
    .swiper-pagination-bullet {
        background: #fff;
    }
    .video {
        position: absolute;
        left: 1.14rem;
        top: 1.79rem;
        width: 2.57rem;
        height: 2.57rem;
        z-index: 4;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .languages {
        position: absolute;
        right: 0.86rem;
        top: 1.79rem;
        z-index: 4;
        &.allactive {
            min-width: 20rem;
        }
    }
}

.dec {
    padding: 1rem 1.14rem 0 1.14rem;
    .row {
        border-bottom: 1px solid #E6E6E6;
        padding-bottom: 0.8rem;
        display: flex;
        justify-content: space-between;
        position: relative;
        margin-bottom: 1.14rem;
        .left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 50%;
            .img {
                width: 1.71rem;
                height: 1.71rem;
                display: inline-block;
                margin-right: 0.5rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 50%;

            .img {
                display: inline-block;
                width: 1.14rem;
                height: 1.14rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .title {
                font-size: 0.86rem;
            }
        }



        .title {
            line-height: 100%;
        }
    }
    .buttom {
        display: flex;
        justify-content: space-around;
        padding: 0.2rem;
        margin-bottom: 0.86rem;

        a.holder {
            display: inline-block;
            width: 25%;
            padding: 0.5rem 2px;
            align-items: center;
            .icon {
                display: block;
                width: 1.71rem;
                height: 1.716rem;
                position: relative;
                margin: 0 auto 0.1rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .title {
                text-align: center;
            }
        }
    }
    .content{
        line-height: 1.62rem;
        margin-bottom: 3.43rem;
    }
}
</style>