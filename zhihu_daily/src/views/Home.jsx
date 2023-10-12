import React, {useEffect, useRef, useState} from 'react'
import HomeHead from "../components/HomeHead";
import _ from '../assets/utils'
import './Home.less'
import {Divider, Image, Swiper} from "antd-mobile";
import {SwiperItem} from "antd-mobile/es/components/swiper/swiper-item";
import {Link} from "react-router-dom";
import api from "../api";
import NewsItem from "../components/NewsItem";
import {DotLoading} from "antd-mobile/2x";
import SkeletonAgain from "../components/SkeletonAgain";

export default function Home(){
    /*
    * today 当日日期,用于导航栏的时间显示
    * bannerData 轮播图数据
    * */
    let [today, setToday] = useState(_.formatTime(null, '{0}{1}{2}')),
        [bannerData, setBannerData] = useState([]),
        [newsList, setNewsList] = useState([]);
    
    let loadMore = useRef();
    
    /*
    * useEffect hook 组件挂载完毕后调用
    * */
    useEffect(() => {
        (async () => {
            try {
                let{date, stories, top_stories} = await api.queryNewsLatest();
                setToday(date);
                setBannerData(top_stories);
                newsList.push({
                    date,
                    stories
                });
                setNewsList([...newsList]);
            }catch (_) {}
        })();
    }, []);
    
    /*
    * 设置监听器
    * */
    useEffect(() => {
        let ob = new IntersectionObserver( async changes => {
            // 监听 loadMore 是否加载进入视图
            let {isIntersecting} = changes[0];
            if(isIntersecting) {
                try{
                    let time = newsList[newsList.length - 1]['date'];
                    let res = await api.queryNewsBefore(time);
                    newsList.push(res);
                    setNewsList([...newsList]);
                }catch (_){}
            }
        });
        let loadMoreBox = loadMore.current;
        // 监听 loadMore 组件
        ob.observe(loadMore.current);
        
        return () => {
            ob.unobserve(loadMoreBox);
            ob = null;
        }
    }, [])
    
    return (
        <div className="home-box">
            {/* 导航栏 */}
            <HomeHead today={today}/>
            
            {/* 首页轮播图 */}
            <div className="swiper-box">
                {
                    bannerData.length > 0 ? <Swiper autoplay={true} loop={true}>
                        {
                            bannerData.map(item => {
                                let{id, image, title, hint} = item
                                return(
                                    <SwiperItem key={id}>
                                        <Link to={{
                                            pathname: `/detail/${id}`
                                        }}>
                                            <Image src={image} lazy/>
                                            <div className="desc">
                                                <h3 className="title">{title}</h3>
                                                <div className="author">{hint}</div>
                                            </div>
                                        </Link>
                                    </SwiperItem>
                                );
                            })
                        }
                    </Swiper> : null
                }
            </div>
            
            {/* 新闻列表 */}
            {
                newsList.length === 0 ? <><SkeletonAgain /><SkeletonAgain /><SkeletonAgain /></> :
                    <> {
                            newsList.map((item, index) => {
                                let {date, stories} = item;
                                return (
                                    <div className="news-box" key={date}>
                                        {
                                            index !== 0 ? <Divider contentPosition='left'>{_.formatTime(date, '{1}月{2}日')}</Divider> : null
                                        }
                                        <div className="list">
                                            {
                                                stories.map(cur => {
                                                    return <NewsItem key = {cur.id}
                                                                     info = {cur}
                                                    />})
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }</>
            }
            
            {/* 加载更多 */}
            <div className="loadmore-box" ref={loadMore}>
                <DotLoading />
                数据加载中
            </div>
        </div>
    )
}