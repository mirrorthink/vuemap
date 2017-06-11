<template>
    <div class="holder">
    
        <div class="item" v-for="(message,index) in navMessages" @touchend.stop.prevent="show(index)" @click="show(index)">
            <span class="icon">
                <img v-lazy="message.icon" alt="">
                <span class="cover" v-bind:class="{ active: message.show }"></span>
            </span>
            <span class="title">{{message.item[activeLanguage]}}</span>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'mynav',

    data() {
        return {
            navMessages: [
                {
                    "item": {

                        'chiness': '路线',
                        'english': 'route'

                    },
                    "icon": '/static/img/luxian.png',
                    'show': false,
                    'layer': 'routeLayer',
                    'type': 'route',

                },
                {

                    "item": {

                        'chiness': '景点',
                        'english': 'sight'

                    },
                    "icon": '/static/img/int_jingdian@2x.png',
                    'show': true,
                    'layer': 'sightLayer',
                    'type': 'sight',
                },
                {

                    "item": {

                        'chiness': '厕所',
                        'english': 'wc'

                    },
                    "icon": '/static/img/int_WC@2x.png',
                    'show': false,
                    'layer': 'wcLayer',
                    'type': 'wc',

                },
                {

                    "item": {

                        'chiness': '餐饮',
                        'english': 'food'

                    },
                    "icon": '/static/img/int_eat@2x.png',
                    'show': false,
                    'layer': 'foodLayer',
                    'type': 'food',
                },
                {

                    "item": {

                        'chiness': '停车场',
                        'english': 'park'

                    },
                    "icon": '/static/img/int_Park@2x.png',
                    'show': false,
                    'class': 'jingqu',
                    'layer': 'parkLayer',
                    'type': 'park',
                },

                {

                    "item": {

                        'chiness': '车站',
                        'english': 'stop'

                    },
                    "icon": '/static/img/int_bus@2x.png',
                    'show': false,
                    'layer': 'stopLayer',
                    'type': 'stop',
                },
                {

                    "item": {

                        'chiness': '全景点',
                        'english': 'pano'

                    },
                    "icon": '/static/img/int_360@2x.png',
                    "url": "",
                    'show': false,
                    'layer': 'panoramicLayer',
                    'type': 'panoramic',
                },
                {

                    "item": {

                        'chiness': '其他',
                        'english': 'other'

                    },
                    "icon": '/static/img/int_other@2x.png',
                    "url": "",
                    'show': false,
                    'layer': 'otherLayer',
                    'type': 'other',
                },
            ]

        }
    },
    mounted() {


    },
    created: function () {

    },
    computed: mapState([ 'activeLanguage']),
    methods: {
        show(index) {
            this.navMessages[index].show = !this.navMessages[index].show;
            this.$emit('change', {
                'state': this.navMessages[index].show,
                'type': this.navMessages[index].type,
            })
        }
    },


}
</script>


<style scoped lang="less">
.holder {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    //flex-wrap: wrap;
    padding: 0.86rem 1.07rem;
    width: 19.43rem;
    height: 10.86em;
    background: #fff;
    border-radius: 0.5rem;
    border: none;
    &::before {
        content: '';
        width: 0;
        height: 0;
        border: 0.6rem solid transparent;
        border-top-color: #FFF;
        position: absolute;
        right: 15%;
        bottom: -1.1rem;
    }
    .item {
        background: #FFF;
        min-width: 25%;
        padding-bottom: 8px;
        padding-top: 8px;
        float: left;
        &:hover {
            cursor: pointer;
            background: #FFF;
        }
        span.icon {
            width: 1.71rem;
            height: 1.71em;
            display: block;
            margin: 0 auto;
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            .cover {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 1.71rem;
                height: 1.71em;
                display: block;

                background: rgba(255, 255, 255, 0.5);
                &.active {
                    background: rgba(255, 255, 255, 0)!important;
                }
            }
        }
        span.title {
            text-align: center;
            display: block;
            margin-top: 0.5rem;
        }
    }
}
</style>


