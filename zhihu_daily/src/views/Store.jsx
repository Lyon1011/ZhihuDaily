import React, {useEffect} from 'react'
import styled from "styled-components";
import {connect} from "react-redux";
import action from "../store/action";
import NavBarAgain from "../components/NavBarAgain";
import SkeletonAgain from "../components/SkeletonAgain";
import NewsItem from "../components/NewsItem";
import {SwipeAction, Toast} from "antd-mobile";
import api from "../api";

const StoreBox = styled.div`
	.box{
		background: #fff;
		box-sizing: border-box;
		padding: 30px;
		width: 750px;
		height: 220px;
		text-align: left;
		.adm-swipe-action-actions-right{
			top: 50%;
			transform: translate(0, -50%);
			height: 131.2px;
		}
	}
	
`;
const Store = (props) => {
	let {list: storeList,queryStoreListAsync, removeStoreListById} = props;
	useEffect(() => {
		// 加载组件后若 redux 中没有收藏列表, 异步派发获取
		if (!storeList) queryStoreListAsync();
	}, [])
	
	const handleRemove = async (id) => {
		try{
			let {code} = await api.storeRemove(id);
			if (+code !== 0){
				Toast.show({
					icon: 'fail',
					content: '移除失败'
				})
				return;
			}
			Toast.show({
				icon: 'success',
				content: '移除成功'
			})
			removeStoreListById(id);
		}catch(_){}
	}
	
	return (
		<StoreBox>
			<NavBarAgain title='我的收藏' />
			{storeList ?
				<div className='box'>
					{storeList.map(item => {
						let {id, news} = item;
						return <SwipeAction key={id} rightActions={[{
							key: 'delete',
							text: '删除',
							color: 'danger',
							onClick: handleRemove.bind(null, id)
						}]}>
							<NewsItem info={news}/>
						</SwipeAction>;
					})}
				</div> :
				<SkeletonAgain />
			}
		</StoreBox>
	)
}

export default connect(
	state => state.store,
	action.store
)(Store);