import {fromJS} from 'immutable'
import ActionTypes from '../constants/constant_index'

const initialState = {
	dataJson: null,
	tapState: false,
	tapNumber: null,
	tapBoard: false,
	pressIndex: null,
}

export default function(state = initialState, {type, payload}){
	state = fromJS(state);
	switch (type) {
		case ActionTypes.DATA_JSON:
			return state.set('dataJson', payload.dataObject).toJS()

		case ActionTypes.TAP_NUMBER:
			return state.set('tapNumber', payload.data).toJS()

		case ActionTypes.TAP_STATE:
			return state.set('tapState', payload.data).toJS()

		case ActionTypes.TAP_BOARD:
			return state.set('tapBoard', payload.data).toJS()

		case ActionTypes.PRESS_INDEX:
			return state.set('pressIndex', payload.data).toJS()

		default:
			return state.toJS()
	}
}