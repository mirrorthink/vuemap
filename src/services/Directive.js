// 全局指令配置
import Vue from 'vue'
export const Direct = {
  data: [
    {
      name: 'title',
      update: (el, binding) => {
        document.title = binding.value
        el.remove()
      }
    },
    {
      name: 'direct',
      update: (el, binding, vnode, oldVnode) => {
        let t = binding.value
        // t.$cookie.set('mobile', '17000221762', {path: '/', expires: '1M'})
        // t.$cookie.set('token', 'WUksks883KXK', {path: '/', expires: '1M'})
        el.addEventListener('click', () => {
          if (!t.$cookie.get('token')) {
            t.$router.push({ name: 'login' })
          }
        })
      }
    },
    {
      name: 'cet',
      update: (el, binding) => {
        let w = (document.body.offsetWidth / 2) - (120 / 2)
        el.style.left = w + 'px'
      }
    },
    {
      name: 'setView',
      update: (el, binding) => {
        // console.log(el, binding)
        el.style.height = document.body.offsetHeight + 'px'
      }
    },
    {
      name: 'direction',
      update: (el) => {
        el.addEventListener('click', () => {
          // console.log(this)
        })
      }
    },
    {
      name: 'substr',
      update: (el, binding) => {

        var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        var isChiness = reg.test(el.innerHTML);
        if (el.innerHTML.length > binding.value) {
          if (isChiness) {
            console.log('China')
            el.innerHTML = el.innerHTML.substring(0, binding.value) + "..."
          } else {
            console.log('noChina')
            el.innerHTML = el.innerHTML.substring(0, binding.value * 2) + "..."

          }
        } else {
           return
        }



      }
    }
  ],
  use: (arr, v) => {
    for (var i in arr.data) {
      v.directive(arr.data[i].name, arr.data[i].update)
    }
  }
}

export default Direct.use(Direct, Vue)

