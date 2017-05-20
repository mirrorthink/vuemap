

export default {
	changMode(state, payload) {
		var key = payload.name
		state[key].activeindex = payload.activeindex;
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
		state.simulate =boolen ;
	}
}