import {createStore, combineReducers} from 'redux'
import View from './reducers/View'

export default createStore(
	combineReducers({
		View
	},{})
)