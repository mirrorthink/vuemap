import Vue from 'vue'
import './Directive'
let ol = require('openlayers')
/*
export function CheckVersion(u, ve) {
  let v = u.match(ve)

  if (v) {
    let s = v[0].substr(v[0].indexOf('/') + 1, v[0].length)
    return parseFloat(s) < 1.4 ? !1 : !0
  }
  return false
}
export function CheckLogin(t) {
  let token = t.$cookie.get('token')
  if (token) {
    return true
  }
  return token
}
export function Http(args) {
  let _methods = args.methods
  let _url = args.url
  let _formData = args.formData
  let _successHandle = args.successHandle
  let _errorHandle = args.errorHandle || function () { }

  Vue.http[_methods](_url, _formData)
    .then(resolve => {
      return resolve.json()
    })
    .then(json => {
      _successHandle(json)
    })
    .catch(reject => {
      _errorHandle(reject)
    })
    .finally(function () {
      // isLoading.show = false
    })
}

export function repeatMobile(args) {
  return args.mobile.replace(/1(\d{2})\d{4}(\d{4})/g, '1$1****$2')
}*/
export function computDistant(location1,location2) {
  var wgs84Sphere = new ol.Sphere(6378137);
  let distant = wgs84Sphere.haversineDistance(location1, location2);
  // console.log(this.message.location)
   distant = distant ? (distant > 1000 ? distant.toFixed(0) / 1000 + 'km' : distant.toFixed(0) + 'm') : '未知';
   return distant
}