<template>
    <div class="popoverouter">
        <popupHeader v-once :location="message.location" :title="message.title" class="popupHeader"></popupHeader>
        <div class="content">
            <div class="left">
                <div class="img" v-bind:class="{ small: message.mode == 'auto' }">
                    <img :src="message.imgurl" alt="" class="bg">
                </div>
                <div class="videoHolder" v-bind:class="{ small: message.mode == 'auto' }" v-if="message.mode != 'auto' ">
                    <div class="video" v-on:click="navVideo">
                        <img src="/static/img/video@3x.png" alt="" v-if="message.video">
                    </div>
                </div>
    
            </div>
            <div class="right">
                <div class="detail" v-substr="message.mode == 'auto' ?  25 : 50"> {{message.dec}}</div>
            </div>
        </div>
        <div class="more" v-bind:class="{ small: message.mode == 'auto' }">
            <a v-on:click="navDetail">{{moreWord[activeLanguage]}}</a>
        </div>
        <div class="popupBottom" v-if="message.mode != 'auto' ">
            <popupBottom v-once :messageId="message.id"></popupBottom>
        </div>
    
    </div>
</template>
<script>
let ol = require('openlayers')
import { mapState, mapActions, mapMutations } from 'vuex';

import popupHeader from './popupHeader'
import popupBottom from './popupBottom'
export default {
    name: 'popup',
    components: {
        popupHeader,
        popupBottom
    },
    props: {
        message: {
            type: Object,
            required: false,
            default: function () {
                return {
                    'id': '',
                    'title': '',
                    'dec': '',
                    'location': [],
                    'mode': ''
                }
            }
        },


        currentPopid: String,
        close: {
            type: String,
            required: false
        },

    },

    data() {
        return {
            distant: 0,
            substrNumber: 40,
            moreWord: {
                'chiness': '更多详情',
                'english': 'More'
            }
        }
    },
    computed: mapState(['activeLanguage']),
    mounted() {

        (this.message.mode == 'auto') ? (this.substrNumber = 20) : (this.substrNumber = 40)
    },
    created: function () {

    },

    methods: {
        onclose() {
            this.$emit('close')
        },
        navVideo() {
            this.$router.push({ name: 'video', params: { id: this.message.id } })

        },
        navDetail() {
            this.$router.push({ name: 'detail', params: { id: this.message.id } })

        },

    }
}
</script>


<style scoped lang="less">
.popoverouter {
    background: #FFFFFF;
    padding: 1rem 1.14rem 0rem;
    border-radius: 0.2rem;
    width: 100%;
    .content {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 0.7rem;
        position: relative;
        width: 100%;
        .left {
            margin-right: 1.14rem;
            .img {
                width: 6.29rem;
                height: 6.29rem;
                &.small {
                    width: 2.86rem!important;
                    height: 2.86rem!important;
                }
                img.bg {
                    width: 100%;
                    height: 100%;
                }
            }
            .videoHolder {
                width: 6.29rem;
                height: 6.29rem;
                position: absolute;
                top: 0px;
                left: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
                div.video {
                    width: 2.57rem;
                    height: 2.57rem;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .right {
          // min-width: 15.29rem;
            .detail {
                line-height: 1.62rem;
                position: relative;
                top: -0.31rem;
            }
        }
    }
    .more {
        padding-bottom: 1.36rem;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid #E6E6E6;
        margin-bottom: 1.07rem;
        &.small {

            border-bottom: none!important;
            margin-bottom: 0rem!important;
        }



        a {
            background: #927028;
            color: #fff;
            display: inline-block;
            padding: 0.43rem 0.57rem;
            border-radius: 0.2rem;
            font-size: 0.86rem;
            font-weight: lighter;
            line-height: 100%;
        }
    }
    .popupBottom {
        //  margin-top: 1.07rem;
        padding-bottom: 1.36rem;
    }
    .popupHeader {
        margin-bottom: 1rem;
    }
}
</style>