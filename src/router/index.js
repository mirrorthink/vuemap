
import Hello from '@/components/Hello'
import App from '../App'
export default [{
    path: '/',
    component: App,
    children: [
        {
            path: '',
            name: 'home',
            component: r => require.ensure([], () => r(require('../page/home')), 'home')
        },
        {
            path: 'sightList',
            name: 'sightList',
            component: r => require.ensure([], () => r(require('../page/sightList')), 'sightList')
        },
        {
            path: 'baidumap',
            name: 'baidumap',
            component: r => require.ensure([], () => r(require('../page/baidumap')), 'baiducontainer')
        },
        {
            path: '/img/:id',
            name: 'img',
            component: r => require.ensure([], () => r(require('../page/img')), 'img')
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: r => require.ensure([], () => r(require('../page/detail')), 'detail')
        },
        {
            path: '/panoramic/:id',
            name: 'panoramic',
            component: r => require.ensure([], () => r(require('../page/panoramic')), 'panoramic')
        },

    ]
}]