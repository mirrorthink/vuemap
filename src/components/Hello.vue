<template>
  <div class="ol-map" id="map" ref="map"></div>
</template>
<script>
let ol = require('openlayers')
require('openlayers/dist/ol.css')
export default {
  name: 'hello',
  data () {
    return {

      map: {
        type: Object,
        default: {}
      }
    }
  },
  mounted () {
    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({

        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    })
    this.map.setTarget(this.$refs.map.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#map{
  width:100%;
  height:100vh;
}
</style>
