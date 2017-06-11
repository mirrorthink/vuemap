<template>
    <div class="container">
        <div class="photoConstainer">
            <mySwiper v-once autoplay=2000 height='26.79rem' :sightId='message.id'>
            </mySwiper>
            <div class="video" v-if="message.video" v-on:click="navVideo">
    
                <img src="/static/img/video@3x.png" />
    
            </div>
            <div class="languages" v-bind:class="{ allactive: allShow}">
                <toggleBar v-bind:Messages="languageMessages"></toggleBar>
            </div>
    
        </div>
        <div class="dec">
            <popupHeader :location="message.location" :title="message.title"></popupHeader>
            <popupBottom :messageId="message.id" v-if="message.mode != 'auto' " class="popupBottom"></popupBottom>
            <div class="content">
    
                <div class="detail"> {{message.dec}}</div>
    
            </div>
    
        </div>
        <audioplay v-if="audioShow" v-on:close="audioShowContral"></audioplay>
    </div>
</template>
<script>
import mySwiper from '../components/mySwiper'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

import toggleBar from '../components/toggleBar'
import audioplay from '../components/audioPlay'

import popupHeader from '../components/popup/popupHeader'
import popupBottom from '../components/popup/popupBottom'
//console.log(this.$refs.swiperTop)
export default {
    name: 'detail',
    components: {
        popupBottom,
        popupHeader,
        toggleBar,
        audioplay,
        mySwiper
    },
    data() {
        return {
            view: null,


            activeSightMessages: {
                title: '',
                dec: ''
            },
            message: {
                'id': '',
                'title': '',
                'dec': '',
                'location': [],
                'video': ''
            },

        }
    },

    mounted() {
        let id = this.$route.params.id;
        this.getSightMessageById(id).then((data) => {
            this.message = data;

        })

    },


    computed: {
        ...mapState(['languageMessages', 'audioShow', 'allShow',]),
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapGetters([
            'swiperImg',
        ])
    },

    methods: {

        navVideo() {
            this.$router.push({ name: 'video', params: { id: this.message.id } })
        },




        ...mapActions([
            'getSightMessageById' // 
        ]),
        ...mapMutations(['audioShowContral'])

    },
    beforeDestroy() {
        this.audioShowContral(false)
    },
    watch: {

        allShow(curVal, oldVal) {
            this.allShow = curVal;
        },
    },
}
</script>


<style lang="less">
.container {
    background: #fff;
}

.photoConstainer {
    width: 100%;
    height: 26.79rem;
    position: relative;
    top: 0px;
    left: 0px;

    .video {
        position: absolute;
        left: 1.14rem;
        top: 1.79rem;
        width: 2.57rem;
        height: 2.57rem;
        z-index: 4;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .languages {
        position: absolute;
        right: 0.86rem;
        top: 1.79rem;
        z-index: 4;
        &.allactive {
            min-width: 20rem;
        }
    }
}

.dec {
    padding: 1rem 1.14rem 0 1.14rem;

    .content {
        margin-top: 0.86rem;
        line-height: 1.62rem;
        margin-bottom: 3.43rem;
    }
    .popupBottom {
        margin-top: 1.64rem;
    }
}
</style>