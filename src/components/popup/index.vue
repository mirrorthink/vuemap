<template>
    <div class="outer">
        <div class="row">
            <span class="title"> {{message.title}}</span>
            <span class="close" v-on:click="onclose" v-if="close"> X</span>
        </div>
        <div class="content">
            <div class="detail"> {{message.dec}}</div>
            <div class="more">
                <a v-on:click="navDetail">更多详情</a>
            </div>
            <div class="distent">距离200m</div>
        </div>
        <div class="buttom">
            <a class="holder" v-on:click="playaudio">
                <span class="icon">
                    <img src="../../assets/img/play_button.png" alt="">
                </span>
                <span class="title">播放</span>
            </a>
            <a class="holder" v-on:click="navImg">
                <span class="icon">
                    <img src="../../assets/img/img.png" alt="">
                </span>
                <span class="title">图片</span>
            </a>
            <a class="holder" v-on:click="navPanoramic">
                <span class="icon">
                    <img src="../../assets/img/panoramic.png" alt="">
                </span>
                <span class="title">全景</span>
            </a>
            <a class="holder">
                <span class="icon">
                    <img src="../../assets/img/route.png" alt="">
                </span>
                <span class="title">去这里</span>
            </a>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
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
        }
    },
    mounted() {


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
.outer {
    border: 1px solid #DCDCDC;
    background: #FFF;
    box-shadow: 0.625rem 0.625rem 1.25rem rgba(223, 223, 223, 0.6);
    &::before {
        content: '';
        width: 0;
        height: 0;
        border: 0.4375rem solid transparent;
        border-right-color: #DCDCDC;
        position: absolute;
        left: -0.875rem;
        top: 50%;
        margin-top: -1.25rem;
    }
    &::after {
        content: '';
        width: 0;
        height: 0;
        border: 0.3125rem solid transparent;
        border-right-color: #fff;
        position: absolute;
        left: -0.625rem;
        top: 51%;
        margin-top: -1.25rem;
    }
    .row {
        border-bottom: 1px solid #fff;
        padding-bottom: 0.3125rem;
        background: whitesmoke;
        padding: 0.5rem 0.625rem;

        .title {
            font-weight: bold;
        }
        .close {
            float: right;
        }
    }
    .content {
        font-size: 0.875rem;
        padding: 1.25rem 0.625rem 0.3125rem 0.625rem;
        .more {
            text-indent: 2.5rem;
            margin-top: 0.5rem;
            a {
                color: #0000FF;
                text-decoration: underline;
            }
        }
        .distent {

            color: #DCDCDC;
            text-align: right;
        }
    }
    .buttom {
        display: flex;
        justify-content: space-around;
        padding: 0.2rem;

        a {
            display: inline-block;
            background: rgb(223, 223, 223);
            border: 1px solid #fff;
            border-radius: 2px;
            width: 25%;
            padding: 0.5rem 2px;
            display: flex;
            align-items: center;
            .icon {
                width: 1.5626rem;
                height: 1.5626rem;
                display: inline-block;
                position: relative;

                padding: 0px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>