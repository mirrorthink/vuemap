
import { mapState, mapActions, mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


import commonHeader from '../../components/header'
export default {
    name: 'img',
    components: {
        commonHeader,
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