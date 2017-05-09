import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'


Vue.use(Vuex)

const state = {
	notHere:null,
	geoErr:null,
	geoMessage:'',
	languageMessages: {
		name: 'languageMessages',
		item: ["普语", "粤语", "英语", "泰语", "斯里兰卡语"],
		activeindex: 0,

	},
	languagemode: {
		name: 'languagemode',
		item: ["自动", "手动"],
		activeindex: 0,

	},
	sightMessages: [
		{
			'id': 'lib',
			'title': '图书馆',
			'dec': '祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。邮局的奇妙之处就是“福传万家”，把观音菩萨的祝福和加.',
			'location': [113.408545, 23.020018]

		},
		{
			'id': 'tech',
			'title': '教学楼',
			'location': [113.410195, 23.020654],
			'dec': '钟鼓楼。古代城市中的钟鼓楼原为专用报时之用。自唐代起，寺庙内也设钟和鼓，元、明时期发展为钟楼、鼓楼。观音寺钟鼓楼位于观音广场南北两侧的正中部，相互对应'
		},
		{
			'id': 'dormitory',
			'title': '宿舍',
			'location': [113.407314, 23.020773],
			'dec': '祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。邮局的奇妙之处就是“福传万家”，把观音菩萨的祝福和加.',

		},
		{
			'id': 'canteen',
			'title': '饭堂',
			'location': [113.410240, 23.021807],
			'dec': '祈福邮局。观音山祈福邮局精巧别致，古色古香；邮局快递的不仅是一份开光物品，更是一份祝福，一份爱心。邮局的奇妙之处就是“福传万家”，把观音菩萨的祝福和加.',

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
	]

}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})