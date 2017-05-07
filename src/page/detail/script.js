
import { mapState, mapActions, mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


import commonHeader from '../../components/header'
export default {
    name: 'detail',
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
                autoplay: 1000,
                initialSlide: 1,
                loop: true,
                pagination: '.swiper-pagination',
                paginationClickable: true
            },


        }

    },
    mounted() {
       
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