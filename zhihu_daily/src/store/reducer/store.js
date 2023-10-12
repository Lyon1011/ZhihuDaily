import _ from '../../assets/utils'
import * as TYPES from '../action-type'

let initial = {
	list: null
}
// 收藏列表
export default function storeReducer(state = initial, action) {
	state = _.clone(state)
	switch (action.type) {
		case TYPES.STORE_LIST:
			state.list = action.list;
			break;
		case TYPES.STORE_REMOVE:
			if(Array.isArray(state.list)){
				state.list = state.list.filter(item => {
					return +item.id !== +action.id
				})
			}
			break;
	}
	return state
}
