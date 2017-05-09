let ol = require('openlayers')
require('openlayers/dist/ol.css');
import { mapState, mapActions, mapMutations } from 'vuex'
import toggleBar from '../../components/toggleBar'
import popup from '../../components/popup'
import mynav from '../../components/nav'
export default {
    name: 'hello',
    components: {
        toggleBar, popup, mynav
    },
    data() {
        return {
            state: false,
            map: {
                type: Object,
                default: {}
            },
            navShow: false,
            layer1: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "http://localhost:9096/jnu/{z}/{x}-{y}.jpg"
                })
            }),
            layer2: new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "http://localhost:9096/jnu_Road/{z}/{x}-{y}.png"
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
                        src: '/static/img/location.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/sight.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/wc.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/food.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/park.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/shoping.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/station.png'
                    })
                }),
                new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/static/img/center.png'
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
            geoMessage:'',

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
        // console.log(this.sightMessage)

        // this.sightLayer.setVisible(true);
    },
    mounted() {


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
        this.setlayer(this.sightMessages, this.sightLayer, 1);
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

            let coordinate = e.coordinate;
            let lc = ol.coordinate.toStringXY(ol.proj.transform(
                coordinate, 'EPSG:3857', 'EPSG:4326'), 6);
            // console.log(lc)
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
    computed: mapState(['languageMessages', 'languagemode', 'sightMessages', 'popupContent', 'geoErr', 'notHere']),

    methods: {
        goOn() {
            this.state = false;

        },
        navigate() {
            this.state = false;
        
            this.$router.push({ name: 'baidumap' })

        },
        geofunction() {
            //获取地理位置
            var that = this;
            // console.log(that.notHere())

            var meLable = new ol.Overlay({
                position: ol.proj.fromLonLat([113.260, 23.173]),
                element: document.getElementById('meLable')
            });
            this.map.addOverlay(meLable);
            var markerEl = document.getElementById('geolocation_marker');
            var marker = new ol.Overlay({
                positioning: 'center-center',
                element: markerEl,
                stopEvent: false
            });
            this.map.addOverlay(marker);
            this.geolocation.setTracking(true); // Start position tracking
            this.geolocation.on('change', function () {
                var position = that.geolocation.getPosition();

                var accuracy = that.geolocation.getAccuracy();


                var pos = ol.proj.toLonLat(position, 'EPSG:3857');

                var posme = ol.proj.transform(pos, 'EPSG:4326', 'EPSG:3857');
              
                //TODO
                if (((113.405543 < pos[0] && pos[0] < 113.413496) && (23.016377 < pos[1] && pos[1] < 23.024988))) {
                
                    that.geoMessage = '检测到你不在区域范围内';
                    that.geolocation.setTracking(false);
                    // console.log(that.notHere())
                    that.notHerefun();


                }
                that.view.setCenter(posme)
                marker.setPosition(posme);
                meLable.setPosition(posme);

            });
            this.geolocation.on('error', function () {
             
                that.geoMessage = '无法或群你的地理位置';
                // that.api.announcegeo('geoerr')
                that.geoErrfun();

            });
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

            }

            this.map.addLayer(layer)
            // layer.setVisible(false);

        },
        close($event) {
            this.overlay.setPosition(undefined);

            if ($event) {

            }
            return false;
        },
        toggleNav() {
            this.navShow = !this.navShow;
        },

        ...mapMutations(['notHerefun', 'geoErrfun']),
    },
    watch: {
        notHere(curVal, oldVal) {
            console.log(curVal, oldVal);
            this.state = this.notHere || this.geoErr;
        },
    }
}