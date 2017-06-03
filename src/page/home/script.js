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
            currentPosition: [],
            map: {
                type: Object,
                default: {}
            },
            activeOverlayerMessage: null,
            loadingShow: false,
            popupShow: false,
            meLable: null,
            marker: null,
            musicPlay: null,
            navShow: false,
            setCenterFlag: true,
            layer1: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "https://notifysystem.trade/jnu/{z}/{x}-{y}.jpg"
                    // url: "http://localhost:9096/jnu/{z}/{x}-{y}.jpg"
                })
            }),
            layer2: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "https://notifysystem.trade/jnu_Road/{z}/{x}-{y}.png"
                    //url: "http://localhost:9096/jnu_Road/{z}/{x}-{y}.jpg"
                })
            }),
            center: ol.proj.transform([113.40809030000001, 23.019710099999998], 'EPSG:4326', 'EPSG:3857'),
            geolocation: null,
            view: null,
            sightLayer: new ol.layer.Vector({
                source: new ol.source.Vector()
            }),
            overlay: null,
            message: {
                'id': '',
                'title': '',
                'dec': '.',
                'location': []
            },

            currentPopid: null,
            geoMessage: '',
            activeIconMessage: {},
            autoplay: false,
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
            this.setlayer(data.sight);
            this.setlayer(data.wc)
            this.setlayer(data.food)
            this.setlayer(data.park)
            this.setlayer(data.stop)
            this.setlayer(data.panoramic)
            this.setlayer(data.other)
            // this.sightLayer.setVisible(true);
            this.layerTogleShow('sight', true)
        })
    },

    mounted() {
        this.musicPlay = document.getElementById('music');

        //点击弹框事件，原始方式
        //  this.holder= document.getElementById("overlayerHolder");
        var that = this;
        setTimeout(() => {
            var lable = document.querySelectorAll('.lable');

            for (let i = 0; i < lable.length; i++) {
                lable[i].addEventListener('click', function (event) {

                    that.getSightMessageById(event.target.id).then(function (data) {
                        //Object.assign只是浅拷贝
                        var wgs84Sphere = new ol.Sphere(6378137);
                        that.activeOverlayerMessage = Object.assign({}, data);



                        //防止修改原本对象 采用深拷贝
                        let tempdata = JSON.parse(JSON.stringify(data))
                        tempdata.location[1] = tempdata.location[1] - 0.000775;
                        let posme = ol.proj.transform(tempdata.location, 'EPSG:4326', 'EPSG:3857');
                        that.view.setCenter(posme);
                        that.view.setZoom(18);
                        that.popupShow = true;

                    })
                    //that.view.setCenter(posme)
                }, true)
            }


        }, 1000)
        this.map.on("click", (e) => {
            e.stopPropagation()
            let coordinate = e.coordinate;
            let lc = ol.coordinate.toStringXY(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'), 6);
            console.log(lc)
        });
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
        this.map.addOverlay(this.overlay);
    },
    computed: mapState(['languageMessages', 'languagemode', 'popupContent', 'geoErr', 'notHere', 'audioShow', 'allShow', 'auto', 'playing', 'locating', 'audio', 'flesh']),

    methods: {
        hack() {
            // this.audioShowContral(true);
            this.$store.dispatch({
                type: 'play',
                id: 'slient',
            }).then(() => {
                this.musicPlay.play();
            })
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
                console.log('geolocation')

                var position = that.geolocation.getPosition();

                var accuracy = that.geolocation.getAccuracy();


                var pos = ol.proj.toLonLat(position, 'EPSG:3857');


                let posme = ol.proj.transform(pos, 'EPSG:4326', 'EPSG:3857');

                that.currentPosition = pos

                that.changeCurrentPosition(pos)


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

                    that.setCenterFlag && that.view.setCenter(posme)
                    that.setCenterFlag = false;
                    if (that.autoplay) {
                        that.playByLocate(pos)
                    }
                }

                that.marker.setPosition(posme);



            });


            this.geolocation.on('error', function () {
                console.log('geoerror')


                that.geoMessage = '无法获取你的地理位置';
                that.$store.commit({
                    type: 'geoErrfun',
                    state: true,
                })


            });
        },
        playByLocate(pos, auto) {

            if (((113.406814 < pos[0] && pos[0] < 113.407822) && (23.019997 < pos[1] && pos[1] < 23.021636))) {
                if (this.audio.id == 'dormitory' || this.playing ) {
                    return
                }

                this.dispatchPlayById(this, 'dormitory', auto)
            } else if (((113.407539 < pos[0] && pos[0] < 113.409227) && (23.019375 < pos[1] && pos[1] < 23.020442))) {
                if (this.audio.id == 'lib'  || this.playing) {
                    return
                }
                this.dispatchPlayById(this, 'lib', auto)

            } else {
                if (this.audio.id == 'tech'  || this.playing) {
                    return
                }
                this.dispatchPlayById(this, 'tech', auto)

            }
        },
        dispatchPlayById(that, id, auto) {
            that.$store.dispatch({
                type: 'play',
                id: id,
            }).then(function (value) {
                //   that.pause();
                // that.play();
                that.audioShowContral(true);
                if (auto) {
                    that.play();
                } else {
                    that.pause();
                }
            })
            that.changeFlesh(false)

            that.getSightMessageById(id).then(function (data) {
                //Object.assign只是浅拷贝
                var wgs84Sphere = new ol.Sphere(6378137);
                that.activeOverlayerMessage = Object.assign({ mode: 'auto' }, data);



                //防止修改原本对象 采用深拷贝
                let tempdata = JSON.parse(JSON.stringify(data))
                tempdata.location[1] = tempdata.location[1] - 0.000775;
                let posme = ol.proj.transform(tempdata.location, 'EPSG:4326', 'EPSG:3857');
                that.view.setCenter(posme);
                that.view.setZoom(18);
                that.popupShow = true;

            })
        },
        locate() {
            this.setCenterFlag = true;
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
        setlayer(data) {
            if (data) {
                // console.log(this.styles)
                for (let i = 0, len = data.length; i < len; i++) {
                    var pos = ol.proj.transform(data[i].location, 'EPSG:4326', 'EPSG:3857');
                    /*
                                        let feature1 = new ol.Feature({
                                            geometry: new ol.geom.Point(pos),
                                        });
                                        feature1.setStyle(this.styles[styleindex]);
                                        feature1.setId(data[i].id);*/
                    var lable = document.createElement("span");

                    //  this.holder.appendChild(lable);
                    var t = document.createTextNode(data[i].title);
                    lable.appendChild(t);
                    lable.setAttribute('class', 'lable ' + data[i].type);
                    lable.id = data[i].id;
                    var Lable = new ol.Overlay({
                        position: data[i].location,
                        element: lable,
                    });
                    /*  Lable.on('click',()=>{
                          console.log('ddddddddd')
                      })*/
                    this.map.addOverlay(Lable);
                    Lable.setPosition(pos);
                    // layer.getSource().addFeatures([feature1]);

                }
                //this.map.addLayer(layer)
                //layer.setVisible(false);
                this.layerTogleShow(data[0].type, false)

            }


        },
        layerTogleShow(type, boolen) {

            // layer.setVisible(boolen);
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
            this.layerTogleShow($event.type, $event.state)

        },
        ...mapActions([
            'getSightMessageById', 'getlayerMessage' // 
        ]),
        ...mapMutations(['audioShowContral', 'play', 'pause', 'simulate', 'changeCurrentPosition', 'changeFlesh'])

    },
    watch: {
        notHere(curVal, oldVal) {
            this.state = this.notHere || this.geoErr;
        },
        geoErr(curVal, oldVal) {

            this.state = this.notHere || this.geoErr;
            console.log(this.state)
        },
        allShow(curVal, oldVal) {
            this.allShow = curVal;
        },
        locating(curVal, oldVal) {
            this.playByLocate(this.currentPosition, true)
            if (curVal) {
                this.geofunction()

            }

        },
        auto(curVal, oldVal) {
            this.autoplay = curVal

        }
    },
    destroyed() {
        this.audioShowContral(false)
    }


}