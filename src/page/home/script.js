let ol = require('openlayers')
require('openlayers/dist/ol.css');
import { mapState, mapActions, mapMutations } from 'vuex'
import toggleBar from '../../components/toggleBar'
import popup from '../../components/popup'
import mynav from '../../components/nav'
import loading from '../../components/loading'
import audioplay from '../../components/audioPlay'
export default {
    name: 'hello',
    components: {
        toggleBar, popup, mynav, audioplay, loading
    },
    data() {
        return {
            state: false,
            map: {
                type: Object,
                default: {}
            },
            loadingShow: false,
            meLable: null,
            marker: null,
            navShow: false,
            layer1: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    // url: "https://notifysystem.trade/jnu/{z}/{x}-{y}.jpg"
                    url: "http://localhost:9096/jnu/{z}/{x}-{y}.jpg"
                })
            }),
            layer2: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    // url: "https://notifysystem.trade/jnu_Road/{z}/{x}-{y}.png"
                    url: "http://localhost:9096/jnu_Road/{z}/{x}-{y}.jpg"
                })
            }),
            center: ol.proj.transform([113.40809030000001, 23.019710099999998], 'EPSG:4326', 'EPSG:3857'),
            geolocation: null,
            view: null,
            sightLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),

            styles: [
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/sight.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/wc-icon.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/food-icon.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/park-icon.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/stop-icon.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/panoramic-icon.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/other-icon.png'
                    })
                }),
            ],
            overlay: null,
            message: {
                'id': '',
                'title': '',
                'dec': '.',
                'location': []
            },
            popupShow: false,
            currentPopid: null,
            geoMessage: '',
            activeIconMessage: {},
            //矢量图层

            wcLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),
            foodLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),
            routeLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),
            parkLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),
            panoramicLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),
            stopLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),

            otherLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),

        }
    },
    created() {
        this.view = new ol.View({
            zoom: 18,
            center: this.center, //地图中心

        })
        this.map = new ol.Map({
            layers: [
                this.layer1,
                this.layer2
            ],
            view: this.view
        })
        this.getlayerMessage().then((data) => {
            this.setlayer(data.sight, this.sightLayer, 0);
            this.setlayer(data.wc, this.wcLayer, 1)
            this.setlayer(data.food, this.foodLayer, 2)
            this.setlayer(data.park, this.parkLayer, 3)
            this.setlayer(data.stop, this.stopLayer, 4)
            this.setlayer(data.panoramic, this.panoramicLayer, 5)
            this.setlayer(data.other, this.otherLayer, 6)
            this.sightLayer.setVisible(true);
            this.layerTogleShow(this.sightLayer, 'sight', true)
        })
    },

    mounted() {
        //          test     
        /*  
        this.audioShowContral(true);
        this.$store.dispatch({
            type: 'play',
            id: 'lib',
        }).then(() => {
            console.log('resolve');
            // this.play();
            //this.simulate(true)

        })
        */
        //          test   
        this.creatMeMarker();


        this.map.setTarget(this.$refs.map.id)

        this.geolocation = new ol.Geolocation(({
            projection: 'EPSG:3857',
            trackingOptions: {
                maximumAge: 10000,
                enableHighAccuracy: true,
                timeout: 600000
            }
        }));
        this.geofunction();

        this.overlay = new ol.Overlay(({
            element: this.$refs.popupElement,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        }));
        var that = this;
        this.map.addOverlay(this.overlay);
        this.map.on("click", (e) => {
            //test
            e.stopPropagation();

            let coordinate = e.coordinate;
            let lc = ol.coordinate.toStringXY(ol.proj.transform(
                coordinate, 'EPSG:3857', 'EPSG:4326'), 6);
            console.log(lc)
            this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
                let coordinate = e.coordinate;
                // console.log(coordinate)
                let id = feature.getId();
                this.currentPopid = id
                that.popupContent.forEach(function (e) {
                    // console.log(e.id == id)
                    if (e.id == id) {
                        that.overlay.setPosition(coordinate);
                        that.message = e;
                        that.popupShow = true;

                    }
                });
            })
        });

    },
    computed: mapState(['languageMessages', 'languagemode', 'popupContent', 'geoErr', 'notHere', 'audioShow']),

    methods: {
        hack() {


            /*   this.audioShowContral(true);
               this.$store.dispatch({
                   type: 'play',
                   id: 'lib',
               }).then(() => {
                   document.getElementById('music').play();
                   this.play()
   
               })*/


        },
        goOn() {
            this.state = false;
        },
        navigate() {
            this.state = false;

            this.$router.push({ name: 'baidumap' })

        },
        creatMeMarker() {
            this.meLable = new ol.Overlay({
                position: ol.proj.fromLonLat([113.260, 23.173]),
                element: document.getElementById('meLable')
            });
            this.map.addOverlay(this.meLable);
            this.marker = new ol.Overlay({
                positioning: 'center-center',
                element: document.getElementById('geolocation_marker'),
                stopEvent: false
            });
            this.map.addOverlay(this.marker);
        },
        geofunction() {
            var that = this;

            this.geolocation.setTracking(true); // Start position tracking
            this.geolocation.on('change', function () {
                var position = that.geolocation.getPosition();

                var accuracy = that.geolocation.getAccuracy();


                var pos = ol.proj.toLonLat(position, 'EPSG:3857');

                var posme = ol.proj.transform(pos, 'EPSG:4326', 'EPSG:3857');

                //TODO
                if (!((113.405543 < pos[0] && pos[0] < 113.413496) && (23.016377 < pos[1] && pos[1] < 23.024988))) {

                    that.geoMessage = '检测到你不在区域范围内';
                    that.geolocation.setTracking(false);
                    // console.log(that.notHere())
                    // that.notHerefun();
                    that.$store.commit({
                        type: 'notHerefun',
                        state: true,
                    })
                } else {
                    //在区域范围内
                    that.view.setCenter(posme)
                    //自动播放模式  
                    if (that.languagemode.activeindex == 0) {

                        if (((113.406814 < pos[0] && pos[0] < 113.407822) && (23.019997 < pos[1] && pos[1] < 23.021636))) {
                            that.$store.dispatch({
                                type: 'play',
                                id: 'dormitory',
                            }).then(function (value) {

                                that.play();
                            })
                            that.audioShowContral(true);
                         

                        }

                        if (((113.407539 < pos[0] && pos[0] < 113.409227) && (23.019375 < pos[1] && pos[1] < 23.020442))) {
                            that.$store.dispatch({
                                type: 'play',
                                id: 'lib',
                            }).then(function (value) {

                                that.play();
                            })
                            that.audioShowContral(true);


                        }


                    }
                }
                that.marker.setPosition(posme);
                that.meLable.setPosition(posme);





            });
            this.geolocation.on('error', function () {


                that.geoMessage = '无法获取你的地理位置';
                that.$store.commit({
                    type: 'geoErrfun',
                    state: true,
                })

            });
        },
        locate() {

            this.$store.commit({
                type: 'geoErrfun',
                state: null,
            })
            this.$store.commit({
                type: 'notHerefun',
                state: null,
            })
            this.loadingShow = true;
            this.geofunction();

            setTimeout(() => {
                this.loadingShow = false;
            }, 1000)
        },
        setlayer(data, layer, styleindex) {
            if (data) {
                // console.log(this.styles)
                for (let i = 0, len = data.length; i < len; i++) {
                    var pos = ol.proj.transform(data[i].location, 'EPSG:4326', 'EPSG:3857');

                    let feature1 = new ol.Feature({
                        geometry: new ol.geom.Point(pos),
                    });
                    feature1.setStyle(this.styles[styleindex]);
                    feature1.setId(data[i].id);
                    var lable = document.createElement("span");
                    var t = document.createTextNode(data[i].title);
                    lable.appendChild(t);
                    lable.setAttribute('class', 'lable ' + data[i].type)
                    var Lable = new ol.Overlay({
                        position: data[i].location,
                        element: lable,
                    });
                    this.map.addOverlay(Lable);
                    Lable.setPosition(pos);
                    layer.getSource().addFeatures([feature1]);

                }
                this.map.addLayer(layer)
                //layer.setVisible(false);

                this.layerTogleShow(layer, data[0].type, false)

            }


        },
        layerTogleShow(layer, type, boolen) {

            layer.setVisible(boolen);
            var lable = document.querySelectorAll('.' + type);

            var state = boolen ? "visible" : "hidden"
            for (let i = 0, len = lable.length; i < len; i++) {
                lable[i].style.visibility = state;
            }
        },
        close($event) {
            this.overlay.setPosition(undefined);
            this.popupShow = false;


            return false;
        },
        toggleNav() {
            this.navShow = !this.navShow;
        },
        test() {
            console.log('test')

        },
        navChange($event) {
            this.layerTogleShow(this[$event.layer], $event.type, $event.state)

        },
        ...mapActions([
            'getlayerMessage' // 映射 this.increment() 为 this.$store.dispatch('increment')
        ]),
        ...mapMutations(['audioShowContral', 'play', 'pause', 'simulate'])

    },
    watch: {
        notHere(curVal, oldVal) {
            this.state = this.notHere || this.geoErr;
        },
        geoErr(curVal, oldVal) {
            this.state = this.notHere || this.geoErr;
        },

    },
    destroyed() {
        this.audioShowContral(false)
    }


}