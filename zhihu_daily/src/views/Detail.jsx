import React, {useEffect, useMemo, useState} from 'react'
import './Detail.less'
import {LeftOutline, LikeOutline, MessageOutline, MoreOutline, StarOutline} from "antd-mobile-icons";
import {Badge, Toast} from "antd-mobile";
import api from "../api";
import SkeletonAgain from "../components/SkeletonAgain";
import newsItem from "../components/NewsItem";
import {flushSync} from "react-dom";
import {connect} from "react-redux";
import action from "../store/action";
const Detail = (props) => {
    let {navigate, params} = props;
    // 定义状态
    let [info, setInfo] = useState(null),
        [extra, setExtra] = useState(null);
    // 定义样式
    let link;
    
    const handleStyle = (result) => {
        let {css}= result;
        if(!Array.isArray(css)) return;
        css = css[0];
        if (!css) return;
        link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = css;
        document.head.appendChild(link);
    };
    const handleImage = (result) => {
        let imgPlaceHolder = document.querySelector('.img-place-holder');
        if(!imgPlaceHolder) return;
        let tempImg = new Image();
        tempImg.src = result.image;
        tempImg.onload = () => {
            imgPlaceHolder.appendChild(tempImg);
        };
        tempImg.onerror = () => {
            let parent = imgPlaceHolder.parentNode;
            parent.parentNode.removeChild(parent);
        };
    };
    const handleTitle = (result) => {
        let questionTitle = document.querySelector('.question-title');
        if(!questionTitle) return;
        if(questionTitle.innerText) return;
        if(!result.title) return;
        let tempTitle = document.createElement('div')
        tempTitle.textContent = result.title;
        questionTitle.appendChild(tempTitle);
    }
    // 并行获取数据
    useEffect(() => {
        (async () => {
            try {
                let result = await api.queryNewsInfo(params.id);
                /*
                *  flushSync 解决由于 setState hook 异步
                * 导致 handleImage & handleTitle 拿不到dom元素
                * */
                flushSync(() => {
                    setInfo(result);
                    handleStyle(result);
                })
                // 处理样式 & 图片
                handleImage(result);
                handleTitle(result);
            }catch (_) {}
        })();
        
        // 销毁样式
        return () => {
            if(link) document.head.removeChild(link);
        }
    }, []);
    useEffect(() => {
        (async () => {
            try {
                let result = await api.queryStoryExtra(params.id);
                setExtra(result);
            }catch (_) {}
        })()
    }, []);
    
    // 处理登录/收藏
    let {base: {info: userInfo},
        queryUserInfoAsync,
        location,
        store: {list: storeList}, queryStoreListAsync, removeStoreListById} = props;
    useEffect(() => {
        // 第一次渲染结束校验 userInfo 是否存在, 不存在派发任务同步登录信息
        (async () => {
            if (!userInfo) {
                let {info} = await queryUserInfoAsync();
                userInfo = info;
            }
            if (userInfo && !storeList){
                queryStoreListAsync();
            
             }
        })()
    }, [])
    // 判断是否收藏
    const isStore = useMemo(() => {
        if(!storeList) return false;
        return storeList.some(item => {
            return +item.news.id === +params.id;
        })
    },[storeList, params]);
    
    const handleStore = async () => {
        if (!userInfo){
            Toast.show({
                icon: 'fail',
                content: '请先登录'
            })
            navigate(`/login?to=${location.pathname}`, {replace: true});
            return ;
        }
        if (isStore){
            let item = storeList.find(item => {
                return +item.news.id === +params.id;
            });
            if (!item) return;
            let {code} = await api.storeRemove(item.id);
            if (+code !== 0){
                Toast.show({
                    icon: 'fail',
                    content: '操作失败'
                })
                return;
            }
            Toast.show({
                icon: 'success',
                content: '操作成功'
            });
            // 移除 redux 中的收藏
            removeStoreListById(item.id);
            return
        }
        try{
            let {code} = await api.store(params.id);
            if (+code !== 0){
                Toast.show({
                    icon: 'fail',
                    content: '收藏失败'
                })
                return;
            }
            Toast.show({
                icon: 'success',
                content: '收藏成功'
            })
            // 在 redux 中新增收藏
            queryStoreListAsync();
        }
        catch (e) {}
    };
    
    return (
        <div className = 'detail-box'>
            {
                !info ? <SkeletonAgain /> :
                // 使用 dangerouslySetInnerHTML 将 HTML 字符串识别成标签
                <div className="content" dangerouslySetInnerHTML={{
                        __html: info.body
                }}>
                </div>
            }
            
            {/* 底部图标 */}
            <div className="tab-bar">
                <div className="back"
                     onClick={() => {
                         navigate(-1);
                    }}>
                    <LeftOutline />
                </div>
                <div className="icons">
                    <Badge content ={extra ? extra.comments : 0}><MessageOutline /></Badge>
                    <Badge content ={extra ? extra.popularity : 0}><LikeOutline /></Badge>
                    <span className={isStore ? 'stored' : ''} onClick={handleStore}><StarOutline /></span>
                    <span><MoreOutline /></span>
                </div>
            </div>
        </div>
    )
}
export default connect(
    state => {
        return {
            base: state.base,
            store: state.store
        }
    },
    {...action.base, ...action.store}
)(Detail);