import * as TYPES from "../action-type";
import api from "../../api";

const storeAction = {
	async queryStoreListAsync() {
		let list = null;
		try {
			let {code, data} = await api.storeList();
			if (+code === 0){
				list = data;
			}
		}catch (e) {}
		return{
			type: TYPES.STORE_LIST,
			list
		};
	},
	
	clearStoreList() {
		return {
			type: TYPES.STORE_LIST,
			list: null
		}
	},
	
	removeStoreListById(id) {
		return{
			type: TYPES.STORE_REMOVE,
			id
		};
	}
};
export default storeAction;