var audiolist = [
	{
		id: "lib",
		audio: {
			audioUrl: "/static/mp3/audio5.mp3",
			title: '图书馆'
		}

	},
	{
		id: "tech",
		audio: {
			audioUrl: "/static/mp3/audio2.mp3",
			title: '教学楼'
		}

	},
	{
		id: "dormitory",
		audio: {
			audioUrl: "/static/mp3/audio3.mp3",
			title: '宿舍'
		}

	},
	{
		id: "canteen",
		audio: {
			audioUrl: "/static/mp3/audio4.mp3",
			title: '饭堂'
		}

	},
	{
		id: "slient",
		audio: {
			audioUrl: "/static/mp3/slient.mp3",
			title: '无声'
		}

	},
]

var IconlayerMessage = {
	route: [
		{
			'id': 'route1',


		},
		{
			'id': 'route2',

		},
	],
	sight: [
		{
			'id': 'lib',
			'title': '图书馆',
			'location': [113.408545, 23.020018],
			'type': 'sight'

		},
		{
			'id': 'tech',
			'title': '教学楼',
			'location': [113.410195, 23.020654],
			'type': 'sight'
		},
		{
			'id': 'dormitory',
			'title': '宿舍',
			'location': [113.407314, 23.020773],
			'type': 'sight'
		},
		{
			'id': 'canteen',
			'title': '饭堂',
			'location': [113.410240, 23.021807],
			'type': 'sight'
		}
	],
	wc: [
		{
			'id': 'wc1',
			'title': '厕所',
			'location': [113.406617, 23.019857],
			'type': 'wc'
		},
		{
			'id': 'wc2',
			'title': '厕所',
			'location': [113.407239, 23.022385],
			'type': 'wc'
		},
	],
	food: [
		{
			'id': 'food1',
			'title': '餐饮',
			'location': [113.408377, 23.022375],
			'type': 'food'
		},
		{
			'id': 'food2',
			'title': '餐饮',
			'location': [113.410988, 23.022457],
			'type': 'food'
		},
	],
	park: [
		{
			'id': 'park1',
			'title': '停车场',
			'location': [113.410934, 23.021045],
			'type': 'park'
		},
		{
			'id': 'park2',
			'title': '停车场',
			'location': [113.408810, 23.023978],
			'type': 'park'
		},
	],
	stop: [
		{
			'id': 'stop1',
			'title': '车站',
			'location': [113.410366, 23.021272],
			'type': 'stop'
		},
		{
			'id': 'stop2',
			'title': '车站',
			'location': [113.407758, 23.021005],
			'type': 'stop'
		},
	],
	panoramic: [
		{
			'id': 'panoramic1',
			'title': '全景点',
			'location': [113.409657, 23.017628],
			'type': 'panoramic'
		},
		{
			'id': 'panoramic2',
			'title': '全景点',
			'location': [113.408219, 23.022822],
			'type': 'panoramic'
		},
	],
	other: [
		{
			'id': 'other1',
			'title': '其他',
			'location': [113.405730, 23.021835],
			'type': 'other'
		},
		{
			'id': 'other2',
			'title': '其他',
			'location': [113.407232, 23.019151],
			'type': 'other'
		},
	],
}
export default {

	play({ commit, state }, payload) {
		console.log('paly')
		return new Promise((resolve, reject) => {
			let filterResult = audiolist.filter(function (item, index, array) {
				return (item.id == payload.id);
			});
			if (filterResult.length) {
				state.audio = filterResult[0].audio;
				console.log(state.audio)
				resolve(filterResult[0].audio)
			} else {
				reject();
			}


		})
	},
	getlayerMessage({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			if (payload) {
				if (IconlayerMessage[payload]) {
					let message = IconlayerMessage[payload];

					resolve(message)
				} else {
					reject();
				}

			} else {
				resolve(IconlayerMessage)
			}



		})
	},
	getSightMessageById({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			let acitveItem = state.sightMessages.filter(function (item) {
				return item.id == payload;
			});
			if (acitveItem.length) {
				resolve(acitveItem[0])
			} else {
				reject();
			}
		})
	},
}