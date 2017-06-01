<template>
<div class="holder">
    <common-header title="景点图片"></common-header>
    <div class="constainer">
        <div class="wrapper">

            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                <swiper-slide v-for="slide in swiperImg" :key="slide.backgroundImage" v-bind:style="slide" ></swiper-slide>

                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </swiper>
        </div>

        <!-- swiper2 Thumbs -->

        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
          <swiper-slide v-for="slide in swiperImg" :key="slide.backgroundImage" v-bind:style="slide" ></swiper-slide>
        </swiper>
    </div>
</div>
</template>
<script>

import { mapState, mapActions, mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'



export default {
    name: 'img',
    components: {
  
        swiper,
        swiperSlide
    },
    data() {
        return {
            view: null,
            swiperOptionTop: {
                notNextTick: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 10
            },
            swiperOptionThumbs: {
                notNextTick: true,
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true
            },
            swiperSlides: [
                {
                    backgroundImage: 'url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/kennedy_meadows_0.jpg)',


                },
                {
                    backgroundImage: 'url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/yosemite_national_park_0.jpg)',

                },
                {
                    backgroundImage: 'url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/kennedy_meadows_2.jpg)',

                },
                {
                    backgroundImage: 'url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/kennedy_meadows_3.jpg)',

                },
                {
                    backgroundImage: 'url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/kennedy_meadows4.jpg)',

                },
            ]
        }

    },
    mounted() {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.params.control = swiperThumbs
        swiperThumbs.params.control = swiperTop
        console.log(this.swiperImg)
        console.log(this.$route.params.id)

    },

    computed: {
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapGetters([
            'swiperImg',
        ])
    },
    methods: {

    },

}
</script>


<style scoped lang="less">

.constainer{
width: 100%;
height: 37.25rem;
position: absolute;
bottom: 0px;
}
.swiper-container {
    background-color: #000;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 25rem!important;
    width: 100%;
    margin-bottom: 3rem;
  }
  .gallery-thumbs {
    height: 6.25rem!important;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
.holder{
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top:0px;
    left: 0px;
    background: black;
}

</style>