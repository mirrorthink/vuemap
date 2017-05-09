
import { mapState, mapActions, mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import toggleBar from '../../components/toggleBar'

import commonHeader from '../../components/header'
export default {
    name: 'detail',
    components: {
        commonHeader,
        swiper,
        swiperSlide,
        toggleBar
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
    },
    created() {

    },

    computed: {
        ...mapState(['sightMessages', 'languageMessages']),
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapGetters([
            'swiperImg',
        ])
    },
    methods: {

    },

}