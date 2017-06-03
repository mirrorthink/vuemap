<template>
    <div class="holder">
        <!-- <common-header title="全景" ></common-header>
        <div class="constainer">
            <div class="demo" ref="demo"></div>
        </div>-->
        <iframe src="http://system.china-360.cn/vr/vr.php?id=317&from=singlemessage"></iframe>
    </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'



export default {
    name: 'panoramic',
    components: {


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
</script>


<style scoped lang="less">
.constainer {}

.holder {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 0px;
    left: 0px;
}

iframe {
    width: 100%;
    height: 100vh;
}
</style>