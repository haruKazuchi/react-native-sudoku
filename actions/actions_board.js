import {actionCreator} from 'redux-action-creator'
import ActionTypes from '../constants/constant_index'

export default {
	DataJson: actionCreator(ActionTypes.DATA_JSON, 'dataObject'),
	TapNumber: actionCreator(ActionTypes.TAP_NUMBER, 'data'),
	TapState: actionCreator(ActionTypes.TAP_STATE, 'data'),
	TapBoard: actionCreator(ActionTypes.TAP_BOARD, 'data'),
	PressIndex: actionCreator(ActionTypes.PRESS_INDEX, 'data'),
}