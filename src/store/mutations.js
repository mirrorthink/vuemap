

export default {
	changMode(state, payload) {
		var key = payload.name
		state[key].activeindex = payload.activeindex;
		if (payload.activeindex == 1) {
			state.auto = true;
		} else {
			state.auto = false;
		}
		if (key == 'languageMessages') {
			state.activeLanguage = state[key].language[payload.activeindex]
		}


	},
	notHerefun(state, payload) {

		state.notHere = payload.state;
	},
	geoErrfun(state, payload) {
		state.geoErr = payload.state;
	}
	,
	play(state) {
		state.playing = true
	},
	pause(state) {
		state.playing = false
	},
	audioShowContral(state, boolen) {
		state.audioShow = boolen;
	},
	simulate(state, boolen) {
		state.simulate = boolen;
	},
	changetoggleAllShow(state) {
		state.allShow = !state.allShow;
	},
	changeCurrentPosition(state, payload) {

		state.currentPosition = payload
	},
	changeLoadingShow(state, payload) {
		state.loadingShow = payload
	},
	locating(state, payload) {
		state.locating = payload
	},
	changeFlesh(state, payload) {
		state.flesh = payload;
	},
	changeActiveLanguage(state, payload) {
		console.log(payload)
		state.activeLanguage = payload;
	},

}