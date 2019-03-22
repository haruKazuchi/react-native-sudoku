import {combineReducers} from 'redux'
import reducerBoard from './reducer_board'

const rootReducer = combineReducers({
	board: reducerBoard
})

export default rootReducer