<template>
    <div class="buttom">
        <a class="holder" v-on:click="playaudio">
            <span class="icon">
                <img src="/static/img/detail_vioce@3x.png" alt="">
            </span>
            <div class="title">{{word[activeLanguage][0]}}</div>
        </a>
        <a class="holder" v-on:click="navImg">
            <span class="icon">
                <img src="/static/img/detail_image@3x.png" alt="">
            </span>
            <div class="title">{{word[activeLanguage][1]}}</div>
        </a>
        <a class="holder" v-on:click="navPanoramic">
            <span class="icon">
                <img src="/static/img/int_360@3x.png" alt="">
            </span>
            <div class="title">{{word[activeLanguage][2]}}</div>
        </a>
        <a class="holder">
            <span class="icon">
                <img src="/static/img/detail_go@3x.png" alt="">
            </span>
            <div class="title">{{word[activeLanguage][3]}}</div>
        </a>
    </div>
</template>
<script>

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    name: 'popupBottom',
    props: {
        messageId: '',
        location: '',
    },

    data() {
        return {
            word: {
                'chiness': ['语音','图片','全景','去这里'],
                'english': ['Audio','Images','Panoramic','Go here']
            }
        }
    },

    computed: mapState(['playing','activeLanguage']),
    created: function () {
    },

    methods: {


        playaudio() {
            this.pause();
            this.audioShowContral(true);
            this.$store.dispatch({
                type: 'play',
                id: this.messageId,
            }).then(() => {
                console.log('resolve');
                this.play();
            })
        },
        navImg() {
            this.$router.push({ name: 'img', params: { id: this.messageId } })
        },
        navPanoramic() {
            this.$router.push({ name: 'panoramic', params: { id: this.messageId } })
        },
        showAudio() {

        },
        ...mapMutations(['audioShowContral', 'play', 'pause'])
    }
}
</script>


<style scoped lang="less">
.buttom {
    display: flex;
    justify-content: space-around;

    a.holder {
        display: inline-block;
        width: 25%;
        padding: 0 2px;
        align-items: center;
        .icon {
            display: block;
            width: 1.71rem;
            height: 1.716rem;
            position: relative;
            margin: 0 auto 0.1rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .title {
            text-align: center;
        }
    }
}
</style>