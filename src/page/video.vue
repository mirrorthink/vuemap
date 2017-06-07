<template>
    <div class="container">
        <div class="videoConstainer">
            <video :src="message.video" controls width='100%'></video>
        </div>
    
    </div>
</template>
<script>

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

import { computDistant } from '../services/Global'

//console.log(this.$refs.swiperTop)
export default {
    name: 'video',
    components: {


    },
    data() {
        return {
            message: {
                'id': '',
                'title': '',
                'dec': '',
                'location': [],
                'video': ''
            },

        }
    },
    created() {



    },
    mounted() {
        let id = this.$route.params.id;
        var that = this;

        this.getSightMessageById(id).then(function (data) {
            that.message = data;
            that.distant = computDistant(data.location, that.currentPosition)
            document.title = data.title;


        })

    },


    computed: {
        ...mapState(['sightMessages', 'languageMessages', 'audioShow', 'allShow', 'currentPosition']),
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapGetters([
            'swiperImg',
        ])
    },

    methods: {
        ...mapActions([
            'getSightMessageById' // 
        ]),

    },
    beforeDestroy() {

    },
    watch: {
    },
}
</script>


<style lang="less">
.container {



    .videoConstainer {
        @media screen and (min-width: 1206) {
            video {
                width: 1204px;
            }
        }
        @media screen and (max-width: 1205) {
            video {
                width: 100%;
            }
        }
    }
}
</style>