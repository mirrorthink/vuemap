<template>
    <div class="holder">
    
        <swiper :options="swiperOptionTop" class="gallery" ref="swiper">
            <swiper-slide v-for="slide in swiperImg" :key="slide.backgroundImage" v-bind:style="slide"></swiper-slide>
    
        </swiper>
        <div class="count">
            <span class="activeIndex" ref="count">1</span>
            /{{totle}}
        </div>
    
    </div>
</template>
<script>

import { mapState, mapActions, mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'



export default {
    name: 'mySwiper',
    props: {
        height: {

        },
        autoplay: {
            default: null
        },

    },
    components: {

        swiper,
        swiperSlide
    },
    data() {
        return {
            view: null,
            swiperImg: [],
            swiperOptionTop: {
                notNextTick: true,
                spaceBetween: 10,
                initialSlide: 0,
                autoplay: this.autoplay,
                onSlideChangeStart: (swiper) => {

                    this.$refs.count.innerHTML = (swiper.activeIndex > this.totle) || (swiper.activeIndex < 1) ? 1 : swiper.activeIndex + 1;
                },
            },
            totle: 0,

        }

    },
    mounted() {
        let id = this.$route.params.id;
        document.querySelector('.gallery').style.height = this.height;
        this.getImgById(id).then((data) => {
            console.log(data)
            this.swiperImg = data;
            this.totle = this.swiperImg.length;
        })
    },
    created() {




    },
    computed: {
        // 使用对象展开运算符将 getters 混入 computed 对象中


    },
    methods: {
        ...mapActions(['getImgById'])
    },

}
</script>


<style scoped lang="less">
.constainer {}

.swiper-container {
    background-color: #000;
}

.swiper-slide {
    background-size: cover;
    background-position: center;
}

.gallery {
    width: 100%;
    height: 26.79rem;
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
    .activeIndex {
        color: #fff;
    }
}
</style>