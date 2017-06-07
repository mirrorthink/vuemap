import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'


Vue.use(Vuex)

const state = {
	notHere: null,
	geoErr: null,
	geoMessage: '',
	allShow: false,
	languageMessages: {
		name: 'languageMessages',

		item: ["/static/img/map_language_guo@2x.png",
			"/static/img/map_language_en@2x.png",
			"/static/img/map_language_Thai@2x.png",
			"/static/img/map_language_yue@2x.png",
			"/static/img/language_Sri Lanka@2x.png",
		],
		activeindex: 0,

	},
	currentPosition: [],
	languagemode: {
		name: 'languagemode',
		item: ["/static/img/map_broadcast_off@2x.png", "/static/img/map_broadcast_on@2x.png",],
		activeindex: 0,

	},
	sightMessages: [
		{
			'id': 'lib',
			'title': '图书馆',
			'dec': '祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。',
			'location': [113.408545, 23.020018],
			'imgurl': "/static/img/img1.jpg",
			'video': "/static/video/movie.ogg",

		},
		{
			'id': 'tech',
			'title': '教学楼',
			'location': [113.410195, 23.020654],
			'dec': '钟鼓楼。古代城市中的钟鼓楼原为专用报时之用。自唐代起，寺庙内也设钟和鼓，祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。元',
			'imgurl': "/static/img/img2.jpg",
		},
		{
			'id': 'dormitory',
			'title': '宿舍',
			'location': [113.407314, 23.020773],
			'dec': '祈福邮局。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一',
			'imgurl': "/static/img/img3.jpg",
			'video': "/static/video/movie.ogg",

		},
		{
			'id': 'canteen',
			'title': '饭堂',
			'location': [113.410240, 23.021807],
			'dec': '祈福邮局。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝.',
			'imgurl': "/static/img/img4.jpg",
		}

	],
	imgs: [
		{ "url": "/static/img/img1.jpg" },
		{ "url": "/static/img/img3.jpg" },
		{ "url": "/static/img/img4.jpg" },



	],

	popupContent: [
		{
			'id': 'lib',
			'title': '图书馆',
			'dec': '祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。邮局的奇妙之处就是“福传万家”，把观音菩萨的祝福和加.',

		},
		{
			'id': 'tech',
			'title': '教学楼',
			'dec': '钟鼓楼。古代城市中的钟鼓楼原为专用报时之用。自唐代起，寺庙内也设钟和鼓，元、明时期发展为钟楼、鼓楼。观音寺钟鼓楼位于观音广场南北两侧的正中部，相互对应'
		},
		{
			'id': 'dormitory',
			'title': '宿舍',
			'dec': '祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。邮局的奇妙之处就是“福传万家”，把观音菩萨的祝福和加.',

		},
		{
			'id': 'canteen',
			'title': '饭堂',
			'dec': '祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。邮局的奇妙之处就是“福传万家”，把观音菩萨的祝福和加.',

		}
	],
	playing: false,

	audio: {
		audioUrl: "/static/mp3/slient.mp3",
		title: '无声',
		id:'slient',
	},
	audioShow: false,
	simulate: false,
	loadingShow: false,
	auto:false,
	locating:false,
	flesh:true,

}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})