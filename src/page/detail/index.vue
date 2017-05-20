<template>
    <div class="holder">
        <div class="wraper">
            <common-header title="景点图片"></common-header>
            <div class="constainer">
                <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                    <swiper-slide v-for="slide in swiperImg" :key="slide.backgroundImage" v-bind:style="slide"></swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
    
            <div class="introduce">
                <div class="cover">
                    <h3>{{activeSightMessages.title}}</h3>
                    <div class="detail">{{activeSightMessages.dec}}</div>
                </div>
            </div>
        </div>
        <toggleBar v-bind:Messages="languageMessages"></toggleBar>
        <audioplay v-if="audioShow" v-on:close="audioShowContral" :auto="false"></audioplay>
    </div>
</template>
<script>

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import toggleBar from '../../components/toggleBar'
import audioplay from '../../components/audioPlay'
import commonHeader from '../../components/header'
export default {
    name: 'detail',
    components: {
        commonHeader,
        swiper,
        swiperSlide,
        toggleBar,
        audioplay
    },
    data() {
        return {
            view: null,
            swiperOptionTop: {
                notNextTick: true,
                autoplay: 3000,
                initialSlide: 1,
                loop: true,
                pagination: '.swiper-pagination',
                paginationClickable: true
            },
            activeSightMessages: {
                title: '',
                dec: ''
            }
        }
    },
    mounted() {
        let id = this.$route.params.id;
        this.sightMessages.forEach((e) => {
            if (e.id == id) {
                this.activeSightMessages = e;
            }

        });


        this.$store.dispatch({
            type: 'play',
            id: this.$route.params.id,
        })

        this.audioShowContral(true);

    },
    created() {

    },

    computed: {
        ...mapState(['sightMessages', 'languageMessages', 'audioShow']),
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapGetters([
            'swiperImg',
        ])
    },

    methods: {
        ...mapMutations(['audioShowContral'])

    },
    beforeDestroy() {
        this.audioShowContral(false)
    }
}
</script>


<style scoped lang="less">
.holder {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 0px;
    left: 0px;
    .constainer {
        margin: 0px;
        padding: 0px;
    }
    .gallery-top {
        height: 20rem!important;
        width: 100%;
    }
    .introduce {
        height: 85vh;
        width: 100%;
        background: url("/static/img/detail-bg.png");
        position: relative;
        top: 0rem;
        .cover {
            height: 100%;
            background: rgba(255, 255, 255, 0.6);
            position: absolute;
            top: 0px;
            left: 0px;
            padding: 4vh 1.25rem;
            ;
            width: 100%;
            h3 {
                margin: 0px;
                font-size: 1.3rem;
                padding: 0.3125rem 0px;
                border-bottom: 3px dashed orangered;
                letter-spacing: 2px;
                line-height: 150%;
                color: rgb(51, 51, 51);
            }
            .detail {
                text-indent: 2.2rem;
                font-size: 1.25rem;
                letter-spacing: 2px;
                line-height: 150%;
                margin: 1.25rem 0px;
                color: rgb(51, 51, 51);
                font-weight: lighter;
            }
            .play {
                position: absolute;
                width: 3rem;
                height: 3rem;
                right: 3rem;
                top: 3.6vh;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}

.wraper {
    height: 100vh;
}
</style>