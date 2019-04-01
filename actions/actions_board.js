import {actionCreator} from 'redux-action-creator'
import ActionTypes from '../constants/constant_index'

export default {
	OriginalBoard: actionCreator(ActionTypes.ORIGINAL_BOARD, 'dataObject'),
	Solution: actionCreator(ActionTypes.SOLUTION, 'dataObject'),
	DataJson: actionCreator(ActionTypes.DATA_JSON, 'dataObject'),
	TapNumber: actionCreator(ActionTypes.TAP_NUMBER, 'data'),
	TapState: actionCreator(ActionTypes.TAP_STATE, 'data'),
	TapBoard: actionCreator(ActionTypes.TAP_BOARD, 'data'),
	PressIndex: actionCreator(ActionTypes.PRESS_INDEX, 'data'),
	MasterBoard: actionCreator(ActionTypes.MASTER_BOARD, 'dataArray'),
	GameStart: actionCreator(ActionTypes.GAME_START, 'data'),
}