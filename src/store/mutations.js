

export default {
	changMode(state, payload) {
		var key = payload.name
		state[key].activeindex = payload.activeindex;
		if (payload.activeindex == 1) {
			state.auto = true;
		} else {
			state.auto = false;
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
	toggleAllShow(state) {
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
	}

}