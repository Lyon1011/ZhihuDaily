import _ from '../../assets/utils'
import * as TYPES from '../action-type'

let initial = {
	info: null
}
// 个人信息
export default function baseReducer(state = initial, action) {
	state = _.clone(state);
	switch (action.type) {
		case TYPES.BASE_INFO:
			state.info = action.info;
			break;
		default:
			break;
	}
	return state
}
