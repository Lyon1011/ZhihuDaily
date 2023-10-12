import React, {useState} from 'react'
import {Button} from "antd-mobile";

const ButtonAgain = (props) => {
	let options = {...props};
	let {children, onClick:handle} = options;
	delete options.children;
	
	let [loading, setLoading] = useState(false);
	// 防抖处理
	const clickHandle = async() => {
	  setLoading(true);
	  try {
			await handle();
	  }catch (e) {}
		setLoading(false);
	};
	if (handle) {
		options.onClick = clickHandle;
	}
	return (
        <Button {...options} loading={loading}>
            {children}
        </Button>
	)
}
export default ButtonAgain