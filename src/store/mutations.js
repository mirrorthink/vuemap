

export default {
	changMode(state, payload) {
		var key = payload.name
		state[key].activeindex = payload.activeindex;
	},
	notHerefun(state, payload) {
	
		state.notHere=true;	
	},
	geoErrfun(state, payload){
		state.geoErr=true;
	}
}