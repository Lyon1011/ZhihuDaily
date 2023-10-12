import React, {useEffect, useState} from 'react'
import NavBarAgain from "../components/NavBarAgain";
import {Form, Input, Toast} from "antd-mobile";
import './login.less'
import ButtonAgain from "../components/ButtonAgain";
import api from "../api";
import _ from '../assets/utils'
import {connect} from "react-redux";
import action from "../store/action";

const validate = {
    phone(_, value){
        value = value.trim();
        let reg = /^(?:(?:\+|00)86)?1\d{10}$/
        if(value.length === 0) return Promise.reject(new Error('手机号不能为空'));
        if(!reg.test(value)) return  Promise.reject(new Error('手机号格式错误'));
        return Promise.resolve();
    },
    code(_, value){
        value = value.trim();
        let reg = /^\d{6}$/
        if(value.length === 0) return Promise.reject(new Error('验证码不能为空'));
        if(!reg.test(value)) return  Promise.reject(new Error('验证码格式错误'));
        return Promise.resolve();
    }
}
const Login = (props) => {
    let {queryUserInfoAsync, navigate, usp} = props;
    
    const [formIns] = Form.useForm(),
        [disabled, setDisabled] = useState(false),
        [sendText, setSendText] = useState('发送验证码');
    const submit = async (value) => {
        try{
            await formIns.validateFields();
            let{phone, code} = formIns.getFieldsValue();
            let{code: codeHttp, token} = await api.login(phone, code);
            if(+codeHttp !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '登录失败'
                });
                formIns.resetFields(['code']);
                return ;
            }
            // 登录成功逻辑
            _.storage.set('tk', token);
            await queryUserInfoAsync();
            Toast.show({
                icon: 'success',
                content: '登录成功'
            });
            let to = usp.get('to');
            to ? navigate(to, {replace: true}) : navigate(-1);
        }catch(_){}
    };
    
    let timer = null,
        num = 31;
    const cnt = () => {
        num--;
        if(num === 0){
            clearInterval(timer);
            timer = null;
            setSendText('发送验证码')
            setDisabled(false);
            return;
        }
        setSendText(`${num}秒后重发`)
    };
    const send = async () => {
         try {
           await formIns.validateFields(['phone']);
           let phone = formIns.getFieldValue("phone");
           let {code} = await api.sendPhoneCode(phone);
           if(+code !== 0){
               Toast.show({
                   icon: 'fail',
                   content: '发送失败'
               });
               return;
           }
           setDisabled(true);
           cnt();
           if(!timer) timer = setInterval(cnt, 1000);
         }catch (e) {}
    };
    
    useEffect(() => {
        return () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }
    }, [])
    return (
        <div className = 'login-box'>
            <NavBarAgain title='登录/注册'/>
            <Form layout='horizontal'
                  style={{'--border-top': 'none'}}
                  footer={
                      <ButtonAgain color='primary'
                                   onClick={submit}>
                          提交
                      </ButtonAgain>}
                  form={formIns}
                  initialValues={{phone:'', code:''}}
                  requiredMarkStyle={false}
            >
                <Form.Item name='phone' label='手机号'
                           rules={[{validator: validate.phone}]}>
                    <Input placeholder='请输入手机号'/>
                </Form.Item>
                <Form.Item name='code' label='验证码'
                           rules={[{validator: validate.code}]}
                           // rules={[
                           //     {requeired: true, message: '请输入验证码'},
                           //     {pattern: /^\d{6}$/, message: '验证码格式错误'}
                           // ]}
                           extra={
                                <ButtonAgain size='small'
                                        color='primary'
                                        disabled={disabled}
                                        onClick={send}>
                                    {sendText}
                                </ButtonAgain>
                           }
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}
export default connect(null, action.base)(Login);