//import geojsonObject from "../../../static/json/TG_InternalRoad.js";

var testgeojson = function(ol, map) {
  var image = new ol.style.Circle({
    radius: 5,
    fill: null,
    stroke: new ol.style.Stroke({
      color: "black",
      width: 1
    })
  });
  var styles = {
    Point: new ol.style.Style({
      image: image
    }),
    LineString: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "green",
        width: 1
      })
    }),
    MultiLineString: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "green",
        width: 1
      })
    }),
    MultiPoint: new ol.style.Style({
      image: image
    }),
    MultiPolygon: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "yellow",
        width: 1
      }),
      fill: new ol.style.Fill({
        color: "rgba(255, 255, 0, 0.1)"
      })
    }),
    Polygon: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "blue",
        lineDash: [4],
        width: 3
      }),
      fill: new ol.style.Fill({
        color: "rgba(0, 0, 255, 0.1)"
      })
    }),
    GeometryCollection: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "magenta",
        width: 2
      }),
      fill: new ol.style.Fill({
        color: "magenta"
      }),
      image: new ol.style.Circle({
        radius: 10,
        fill: null,
        stroke: new ol.style.Stroke({
          color: "magenta"
        })
      })
    }),
    Circle: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "red",
        width: 2
      }),
      fill: new ol.style.Fill({
        color: "rgba(255,0,0,0.2)"
      })
    })
  };

  var styleFunction = function(feature) {
    console.log(feature.getProperties());
    return styles[feature.getGeometry().getType()];
  };

  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "../../../static/json/TG_InternalRoad.geojson",
      format: new ol.format.GeoJSON()
    })
  });
  /* var vectorLayer2 = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "../../../static/json/TG_POI.geojson",
      format: new ol.format.GeoJSON()
    }),
    style: styleFunction
  });*/
  var vectorLayer3 = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "../../../static/json/TG_ScenicSpot.geojson",
      format: new ol.format.GeoJSON()
    })
  });
  var vectorLayer4 = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "../../../static/json/TG_InternalRoad.geojson",
      format: new ol.format.GeoJSON()
    })
  });

  map.addLayer(vectorLayer);
  // map.addLayer(vectorLayer2);
  map.addLayer(vectorLayer3);
};

export default testgeojson;
