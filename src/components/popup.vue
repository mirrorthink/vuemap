<template>
    <div class="popoverouter">
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
        <div class="content">
            <div class="left">
                <div class="img">
                    <img :src="message.imgurl" alt="">
                </div>
            </div>
            <div class="right">
                <div class="detail" v-substr> {{message.dec}}</div>
    
            </div>
    
        </div>
        <div class="more">
            <a v-on:click="navDetail">更多详情</a>
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
        
    </div>
</template>
<script>
let ol = require('openlayers')
import { mapState, mapActions, mapMutations } from 'vuex';
import { computDistant } from '../services/Global'
export default {
    name: 'toggleBar',
    props: {

        message: {
            type: Object,
            required: false,
            default: function () {
                return {
                    'id': '',
                    'title': '',
                    'dec': '',
                    'location': []
                }
            }
        },


        currentPopid: String,
        close: {
            type: String,
            required: false
        },

    },
    computed: mapState(['playing']),
    data() {
        return {
            icon: [
                "/static/img/play_button.png",
                "/static/img/img.png",
                "/static/img/panoramic.png",
                "/static/img/route.png"

            ],
            distant: 0,
        }
    },
    computed: mapState(['currentPosition']),
    mounted() {
       /* var wgs84Sphere = new ol.Sphere(6378137);
        let distant = wgs84Sphere.haversineDistance(this.message.location, this.currentPosition);
        // console.log(this.message.location)
        this.distant = distant ? (distant > 1000 ? distant.toFixed(0) / 1000 + 'km' : distant.toFixed(0) + 'm') : '未知';*/
         this.distant=computDistant(this.message.location, this.currentPosition)
    },
    created: function () {

    },

    methods: {
        onclose() {
            this.$emit('close')
        },
        navDetail() {
            this.$router.push({ name: 'detail', params: { id: this.message.id } })

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
        showAudio() {

        },
        ...mapMutations(['audioShowContral', 'play', 'pause'])

    }
}
</script>


<style scoped lang="less">
.popoverouter {
    background: #FFFFFF;
    padding: 1rem 1.14rem 0.86rem;
    border-radius: 0.2rem;
    .row {
        border-bottom: 1px solid #E6E6E6;
        padding-bottom: 0.8rem;
        display: flex;
        justify-content: space-between;
        position: relative;
        margin-bottom: 1rem;
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
    .content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.7rem;
        .left {
            margin-right: 1.14rem;
            .img {
                width: 6.29rem;
                height: 6.29rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .right {
            .detail {
                line-height: 1.62rem;
                position: relative;
                top: -0.31rem;
            }
        }
    }
    .more {
        margin-bottom: 1.36rem;
        display: flex;
        justify-content: flex-end;

        a {
            background: #927028;
            color: #fff;
            display: inline-block;
            padding: 0.43rem 0.57rem;
            border-radius: 0.2rem;
            font-size: 0.86rem;
            font-weight: lighter;
            line-height: 100%;
        }
    }
    .buttom {
        display: flex;
        justify-content: space-around;
        padding: 0.2rem;

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
}
</style>