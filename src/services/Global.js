import Vue from 'vue'
import './Directive'
let ol = require('openlayers')

export function isMobile(u, ve) {

  let userAgentInfo = window.navigator.userAgent;
  let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  // return Agents.find(agent => userAgentInfo.indexOf(agent) !== -1)
  if (Agents.find(agent => userAgentInfo.indexOf(agent) !== -1)) {
    return true;
  } else {
    return false;
  }


}

export function computDistant(location1, location2) {
  var wgs84Sphere = new ol.Sphere(6378137);
  let distant = wgs84Sphere.haversineDistance(location1, location2);
  // console.log(this.message.location)
  distant = distant ? (distant > 1000 ? distant.toFixed(0) / 1000 + 'km' : distant.toFixed(0) + 'm') : '';
  return distant
}

export function formatTime(time) {
  let s = (parseInt(time) % 60) > 9 ? (parseInt(time) % 60) : '0' + (parseInt(time) % 60);

  let m = parseInt(parseInt(time) / 60) > 9 ? parseInt(parseInt(time) / 60) : '0' + parseInt(parseInt(time) / 60);
  return m + ':' + s;
}