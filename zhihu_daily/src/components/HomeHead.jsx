import React, {useEffect, useMemo} from 'react'
import timg from '../assets/images/timg.jpg'
import './HomeHead.less'
import {connect} from "react-redux";
import action from "../store/action";
import {useNavigate} from "react-router-dom";
const HomeHead = (props) => {
    const navigate = useNavigate()
    let { today, info, queryUserInfoAsync } = props;
    /*
    * useMemo  hook
    * factory  回调函数,仅当监测对象发生改变才调用
    * deps     监测对象
    * 可以将监测传入的八位日期变化,改变时会re-render,优化实时监测
    * */
    let time = useMemo(() => {
        let[, mouth, day] = today.match(/^\d{4}(\d{2})(\d{2})$/),
            area = [' ','一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return {
            day,
            mouth: area[+mouth]+'月'
        }
    }, [today])
    
    useEffect(() => {
        if(!info){
            queryUserInfoAsync();
        }
    }, []);
    return (
        <div className = 'home-head-box'>
            <div className="info">
                <div className="time">
                    <span>{time.day}</span>
                    <span>{time.mouth}</span>
                </div>
                <h2 className="title">知乎日报</h2>
            </div>
            <div className="picture"
                onClick={() => {
                    navigate('/personal')
                }}>
                <img src={info ? info.pic : timg} alt=""/>
            </div>
        </div>
    )
}
export default connect(
    state => state.base,
     action.base
)(HomeHead)