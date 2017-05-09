
export default {
    name: 'mynav',

    data() {
        return {
            navMessages: [
                {
                    "item": "路线",
                    "icon": '/static/img/luxian.png',
                    "url": "",
                    'show': false,
                    'layers': 'routeLayer',
                    'class': 'jingqu',
                    'type': 'route'
                },
                {
                    "item": "景点",
                    "icon": '/static/img/jingdian.png',
                    "url": "",
                    'show': true,
                    'layers': 'sightLayer',
                    'class': 'jingqu',
                    'type': 'sight'
                },
                {
                    "item": "厕所",
                    "icon": '/static/img/wc.png',
                    "url": "",
                    'show': false,
                    'layers': 'wcLayer',
                    'class': 'jingqu',
                    'type': 'wc'

                },
                {
                    "item": "餐饮",
                    "icon": '/static/img/food.png',
                    "url": "",
                    'show': false,
                    'layers': 'foodLayer',
                    'class': 'jingqu',
                    'type': 'food'
                },
                {
                    "item": "停车场",
                    "icon": '/static/img/park.png',
                    "url": "",
                    'show': false,
                    'layers': 'parkLayer',
                    'class': 'jingqu',
                    'type': 'park'
                },

                {
                    "item": "车站",
                    "icon": '/static/img/stop.png',
                    "url": "",
                    'show': false,
                    'layers': 'stationLayer',
                    'class': 'jingqu',
                    'type': 'stop'
                },
                {
                    "item": "全景点",
                    "icon": '/static/img/panoramic.png',
                    "url": "",
                    'show': false,
                    'layers': 'shoppingLayer',
                    'class': 'jingqu',
                    'type': 'panoramic'
                },
                {
                    "item": "其他",
                    "icon": '/static/img/other.png',
                    "url": "",
                    'show': false,
                    'layers': 'centerLayer',
                    'class': 'jingqu',
                    'type': 'other'
                },
            ]

        }
    },
    mounted() {
        console.log(this.navShow)


    },
    created: function () {

    },
    methods: {
        show(index) {

        }

    },

}