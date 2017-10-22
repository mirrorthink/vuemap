//import geojsonObject from "../../../static/json/TG_InternalRoad.js";
import Vue from "vue";
// 加载xml文档
var loadXML = function(xmlFile) {
  var xmlDoc;
  try {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.load(xmlFile);
  } catch (e) {
    try //Firefox, Mozilla, Opera, etc.
    {
      xmlDoc = document.implementation.createDocument("", "", null);
      xmlDoc.async = false;
      xmlDoc.load(xmlFile);
    } catch (e) {
      try //Google Chrome
      {
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", xmlFile, false);
        xmlhttp.send(null);
        xmlDoc = xmlhttp.responseXML.documentElement;
        xmlDoc.load(xmlFile);
      } catch (e) {
        var error = e.message;
        console.log(error);
      }
    }
  }

  return xmlDoc;
};

// 首先对xml对象进行判断
var checkXMLDocObj = function(xmlFile) {
  var xmlDoc = loadXML(xmlFile);
  if (xmlDoc == null) {
    alert("您的浏览器不支持xml文件读取,于是本页面禁止您的操作,推荐使用IE5.0以上可以解决此问题!");
  }
  return xmlDoc;
};
// 然后开始获取需要的Login/Weapon/W的第一个节点的属性值

var xmlDoc = checkXMLDocObj("/static/ap.xml?fdfasdfasd");

var v = xmlDoc.getElementsByTagName("ipAddress")[0].childNodes[0].nodeValue;
var len = xmlDoc.getElementsByTagName("ipAddress").length;
var Arr = [];
for (var i = 0; i < len; i++) {
  var obj = {};
  obj.ipAddress = xmlDoc.getElementsByTagName("ipAddress")[
    i
  ].childNodes[0].nodeValue;
  obj.apLabel = xmlDoc.getElementsByTagName("apLabel")[
    i
  ].childNodes[0].nodeValue;
  Arr.push(obj);
}

export function testgeojson(ol, map) {
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
}

export function testIPlocate() {
  return new Promise(function(resolve, reject) {
    Vue.http.get("https://notifysystem.trade:3001/wechat/ip").then(
      response => {
        var ip = response.body.ip && response.body.ip.substring(7);

        if (ip) {
          //根据IP地址遍历出ap的ip地址
          var flag = false;
          for (let item of Arr) {
            if (item.ipAddress == ip) {
              // alert(1);
              resolve(item.apLabel);

              flag = true;
              break;
            }
          }
          if (!flag) {
            reject("未检测到对应ap");
            alert("未检测到对应ap");
          }
        }
      },
      err => {
        reject(err);
      }
    );
  });
}
