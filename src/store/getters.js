export default {

 swiperImg: state => {
        return state.imgs.map(img => ({ backgroundImage:'url('+img.url+')' }))
    }

}