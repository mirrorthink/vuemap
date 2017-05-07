let ol = require('openlayers')
require('openlayers/dist/ol.css');
import { mapState, mapActions } from 'vuex'
import toggleBar from '../../components/toggleBar'
export default {
    name: 'hello',
    components: {
        toggleBar
    },
    data() {
        return {
            map: {
                type: Object,
                default: {}
            },
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
            view: null

        }
    },
    mounted() {
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
        console.log(this.languageMessages)
    },
    computed: mapState(['languageMessages','languagemode']),
    methods: {
        geofunction() {
            //获取地理位置
            var that = this;
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
                if (!((113.405543 < pos[0] && pos[0] < 113.413496) && (23.016377 < pos[1] && pos[1] < 23.024988))) {
                    that.nohere = true;
                    that.geoMessage = '检测到你不在区域范围内';
                    that.geolocation.setTracking(false);
                    // that.api.announcegeo('nohere')

                }
                that.view.setCenter(posme)
                marker.setPosition(posme);
                meLable.setPosition(posme);

            });
            this.geolocation.on('error', function () {
                that.geoerr = true;
                that.geoMessage = '无法或群你的地理位置';
                // that.api.announcegeo('geoerr')
            });
        },
    }
}