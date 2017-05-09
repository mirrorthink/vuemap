
import { mapState, mapActions } from 'vuex'
import three from '../../components/header'
import commonHeader from '../../components/header'

export default {
    name: 'panoramic',
    components: {

        commonHeader
    },
    data() {
        return {
        }
    },
    created() {

    },
    mounted() {
        let element = this.$refs.demo;
        setTimeout(() => {
            let PSV = new PhotoSphereViewer({
                // Path to the panorama
                panorama: '/static/img/quanjingtu1.jpg',
                // Container
                container: element,

                // Deactivate the animation
                time_anim: false,

                // Display the navigation bar
                navbar: true,

                // Resize the panorama
                size: {
                    width: '100%',
                    height: '500px'
                },


                // Overlay
                overlay: {

                },

                loading_msg: "正在加载，请稍后...",

            });
        }, 500)


    },
    computed: {


    },
    methods: {

    }
}