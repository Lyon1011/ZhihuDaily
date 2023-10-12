import {Suspense, useEffect, useState} from "react";
import {Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import routes from "./routes";
import {Mask, Toast} from "antd-mobile";
import {DotLoading} from "antd-mobile/2x";
import store from "../store";
import action from "../store/action";
// 是否需要做登录态校验
const isCheckLogin = (path) => {
	let {base: {info}} = store.getState(),
		checkList = ['/personal', '/store', '/update'];
	return !info && checkList.includes(path);
}
// 统一路由配置
const Element = function Element(props) {
	let {component: Component, meta, path} = props,
		isShow = !isCheckLogin(path);
	let [_, setRandom] = useState(0);
	
	// 登录态校验
	useEffect(() => {
		if (isShow) return;
		(async () => {
			// 从服务器获取登录信息
			let infoAction = await action.base.queryUserInfoAsync();
			let info = infoAction.info;
			// 若主动获取信息不存在, 进入登录校验
			if (!info){
				Toast.show({
					icon: 'fail',
					content: '请先登录'
				});
				// 跳转至登录页
				navigate({
					pathname: '/login',
					search: `?to=${path}`
				});
				return ;
			}
			store.dispatch(infoAction);
			setRandom(+new Date());
		})()
	})
	
	// 修改 title
	let	{title = '知乎日报-webapp'} = meta || {};
	document.title = title
	
	const navigate = useNavigate(),
		location = useLocation(),
		params = useParams(),
		[usp] = useSearchParams();
	return <>{isShow ?
				<Component navigate={navigate}
		                  location={location}
		                  params={params}
		                  usp={usp}/> :
				<Mask visible={true}>
					<DotLoading color='white'/>
				</Mask>
			}</>;
};
export default function RouterView() {
	return (
		<Suspense fallback={<Mask visible={true}>
			<DotLoading color="white"/>
		</Mask>}>
			<Routes>
				{
					routes.map(item => {
						let {name, path} = item
						return <Route key = {name}
						              path = {path}
						              element = {<Element {...item}/>}>
							</Route>
					})
				}
			</Routes>
		</Suspense>
	)
}