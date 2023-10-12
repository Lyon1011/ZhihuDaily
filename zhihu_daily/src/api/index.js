import http from "./http";

// 根据API获取信息
const queryNewsLatest = () => http.get('/api/news_latest');

const queryNewsBefore = (time) => http.get('/api/news_before', {
	params: {
		time
	}
})

const queryNewsInfo = (id) => http.get('/api/news_info', {
	params: {
		id
	}
})

const queryStoryExtra = (id) => http.get('/api/story_extra', {
	params: {
		id
	}
})

const sendPhoneCode = (phone) => {
	return http.post('/api/phone_code', {
		phone
	});
}

const login = (phone, code) => {
    return http.post('/api/login', {
		phone,
	    code
    })
}

const queryUserInfo = () => {
	return http.get('/api/user_info');
}

const store = (newsId) => {
    return http.post('/api/store', {newsId});
}

const storeRemove = (id) => {
    return http.get('/api/store_remove', {
		params: {
			id
		}
    });
}

const storeList = () => {
    return http.get('/api/store_list')
}

const upload = (file) => {
	let fm = new FormData();
	fm.append('file', file);
	return http.post('/api/upload', fm);
}

const userUpdate = (username, pic) => {
    return http.post('/api/user_update', {
		username,
	    pic
    })
}

const api = {
	queryNewsLatest,
	queryNewsBefore,
	queryNewsInfo,
	queryStoryExtra,
	sendPhoneCode,
	login,
	queryUserInfo,
	store,
	storeRemove,
	storeList,
	upload,
	userUpdate
}
export default api