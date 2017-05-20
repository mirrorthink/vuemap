<template>
    <div class="holder">
    
        <div class="item" v-for="(message,index) in navMessages" @touchend.stop.prevent="show(index)" @click="show(index)">
            <span class="icon">
                <img v-lazy="message.icon" alt="">
            </span>
            <span class="title">{{message.item}}</span>
        </div>
    </div>
</template>
<script>

export default {
    name: 'mynav',

    data() {
        return {
            navMessages: [
                {
                    "item": "路线",
                    "icon": '/static/img/luxian.png',
                    'show': false,
                    'layer': 'routeLayer',
                    'type': 'route',

                },
                {
                    "item": "景点",
                    "icon": '/static/img/jingdian.png',
                    'show': true,
                    'layer': 'sightLayer',
                    'type': 'sight',
                },
                {
                    "item": "厕所",
                    "icon": '/static/img/wc.png',
                    'show': false,
                    'layer': 'wcLayer',
                    'type': 'wc',

                },
                {
                    "item": "餐饮",
                    "icon": '/static/img/food.png',
                    'show': false,
                    'layer': 'foodLayer',
                    'type': 'food',
                },
                {
                    "item": "停车场",
                    "icon": '/static/img/park.png',
                    'show': false,
                    'class': 'jingqu',
                    'layer': 'parkLayer',
                    'type': 'park',
                },

                {
                    "item": "车站",
                    "icon": '/static/img/stop.png',
                    'show': false,
                    'layer': 'stopLayer',
                    'type': 'stop',
                },
                {
                    "item": "全景点",
                    "icon": '/static/img/panoramic.png',
                    "url": "",
                    'show': false,
                    'layer': 'panoramicLayer',
                    'type': 'panoramic',
                },
                {
                    "item": "其他",
                    "icon": '/static/img/other.png',
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
    methods: {
        show(index) {
            this.navMessages[index].show = !this.navMessages[index].show;
            this.$emit('change', {
                'layer': this.navMessages[index].layer,
                'state': this.navMessages[index].show,
                'type': this.navMessages[index].type,
            })
        }
    },

}
</script>


<style scoped lang="less">
.holder {

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 0.5rem;
    .item {
        background: #FFF;
        width: 23%;
        padding-bottom: 8px;
        padding-top: 8px;
        border: 1px solid #ccc;

        &:hover {
            cursor: pointer;
            background: #FFF;
        }
        span.icon {
            font-size: 1rem;
            width: 1.5rem;
            height: 1.5rem;
            display: block;
            margin: 0 auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
        span.title {
            font-size: 0.75rem;
            text-align: center;
            display: block;
        }
    }
}
</style>


