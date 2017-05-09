
import { mapState, mapActions } from 'vuex'

import commonHeader from '../../components/header'

//import BaiduMap from '../../components/BaiduMap'

export default {
    name: 'baiducontainer',
    components: {
        commonHeader,
    },
    data() {
        return {
            view: null,
            ak: 'YSETTlg7of6uSntgtQlsNabaF9QFE9Qx',

            map: null,
            options: {
                // 地图中心坐标
                center: {
                    longitude: 113.5884021,
                    latitude: 22.7819696
                },

                zoom: 17,

            },
            defaultOpts: {
                navCtrl: true,
                scaleCtrl: true,
                overviewCtrl: true,
                enableScrollWheelZoom: true,
                geolocationCtrl: true,
                zoom: 10
            }

        }
    },

    created() {
        this.loader(this.ak, this._draw.bind(this))

    },
    mounted() {

    },
    methods: {
        loader(ak, callback) {
            let realProtocol = 'https:';
            let MAP_URL = `${realProtocol}//api.map.baidu.com/api?v=2.0&ak=${ak}&callback=baidumapinit&s=${realProtocol === 'https:' ? 1 : 0}`;

            let win = window;


            let baiduMap = win['baiduMap'];

            if (baiduMap && baiduMap.status == 'LOADING') {
                return baiduMap.callbacks.push(callback);
            }

            if (baiduMap && baiduMap.status == 'LOADED') {
                return callback();
            }

            win['baiduMap'] = { status: 'LOADING', callbacks: [] };
            win['baidumapinit'] = function () {

                win['baiduMap'].status = 'LOADED';
                callback();
                win['baiduMap'].callbacks.forEach((cb) => cb());
                win['baiduMap'].callbacks = [];
            };

            let createTag = function () {
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = MAP_URL;
                script.onerror = function () {
                    Array.prototype
                        .slice
                        .call(document.querySelectorAll('baidu-map div'))
                        .forEach(function (node) {
                            if (node) {
                                node.style.opacity = 1;
                            }

                        });
                    document.body.removeChild(script);

                };
                document.body.appendChild(script);
            };

            createTag();
        },
        _draw() {
            let options = Object.assign({}, this.defaultOpts, this.options);
            this.map = this.createInstance(options, this.$refs.map);
        },
        createInstance(opts, element) {
            var BMap = window['BMap'];

            var map = new BMap.Map(element);
            map.enableScrollWheelZoom();
            this.daohang(map);

            return map;
        },
        daohang(map) {
            var BMap = window['BMap'];

            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == 0) {
                    var latCurrent = r.point.lat;
                    var lngCurrent = r.point.lng;
                    var walking = new BMap.WalkingRoute(map, { renderOptions: { map: map, autoViewport: true } });
                    walking.search(new BMap.Point(lngCurrent, latCurrent), new BMap.Point(113.420091, 23.023424));

                    walking.setSearchCompleteCallback(function () {
                        if (document.querySelector('#loading')) {
                            var loading = document.querySelector('#loading');
                            loading.setAttribute("style", "display:none")
                        }


                    })
                }
                else {
                    alert('failed' + this.getStatus());
                }
            }, { enableHighAccuracy: true })

        }

    }
}