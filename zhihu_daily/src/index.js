import React from 'react';
import ReactDOM from 'react-dom/client';

import 'lib-flexible'

import './index.less'

import App from "./App";
import {ConfigProvider} from "antd";
import zhCN from "antd-mobile/2x/es/locales/zh-CN";
import {Provider} from "react-redux";
import store from "./store";

// 设置最大宽度
(function (){
	const handleMax = function handleMax() {
		let html = document.documentElement,
			root = document.getElementById('root'),
			deviceW = html.clientHeight;
		root.style.maxWidth = '750px';
		if(deviceW >= 750){
			html.style.fontSize = '75px';
		}
	};
	handleMax();
	window.addEventListener('resize', handleMax)
	}
)()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
	    <Provider store={store}>
		    <App />
	    </Provider>
    </ConfigProvider>
);
