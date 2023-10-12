import _ from "../assets/utils"
import qs from "qs"
import {message} from "antd"
import {error} from "bfj/src/events";
import {string} from "prop-types";

const http = function http(config) {
    if (!(_.isPlainObject(config))) config = {}
    config = Object.assign({
        url: '',
        method: "GET",
        credential: 'include',
        headers: null,
        params: null,
        responseType: 'json',
        signal: null
    }, config)
    // 格式限定
    if (!config.url) throw new TypeError('URL must be required')
    if (!_.isPlainObject(config.headers)) config.headers = {};
    // eslint-disable-next-line no-unused-expressions
    if (config.params !== null && !_.isPlainObject(config.params)) config.params == null;

    let { method, credential, headers, body, params, responseType
    } = config, configUrl = config.url;
    
    // 拼接字符串
    if (params) {
        configUrl += `${configUrl.includes("?") ? '&' : '?'}${qs.stringify(params)}`;
    }
    // 处理普通对象
    if (_.isPlainObject(body)) {
        body = qs.stringify(body);
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    
    //  处理token
    let token = _.storage.get('tk'),
        // 从 api 获取需要请求的接口如下
        safeList = ['/user_info', '/user_update', '/store', '/store_remove', '/store_list'];
    if (token) {
        // 使用正则获取请求地址
        let reg = /\/api(\/[^?#]+)/,
            [, $1] = reg.exec(configUrl) || [];
        let isSafe = safeList.some(item => {
            return $1 === item;
        })
        // 如果目标地址存在于请求地址, 传token
        if (isSafe) headers['authorization'] = token;
    }
   
    
    method = method.toUpperCase();
    config = {
        method,
        credential,
        headers,
        caches: 'no-cache'
    }
    if (/^(POST|PUT|PATCH)$/i.test('POST') && body) config.body = body;
    return fetch(configUrl, config).then(response => {
        let {status , statusText} = response
        if(/^(2|3)\d{2}$/.test(status)){
            let result;
            switch (responseType.toLowerCase()) {
                case 'text':
                    result = response.text()
                    break
                case 'arraybuffer':
                    result = response.arrayBuffer()
                    break
                case 'blob':
                    result = response.blob()
                    break
                default:
                    result = response.json()
                    break
            };
            return result
        };
        return Promise.reject({
            code: -100,
            status,
            statusText
        })
    }).catch(reason => {
        message.error("当前网络繁忙,请稍后再试")
        console.log(reason)
        return Promise.reject(reason)
    })
};

["GET", "HEAD", "DELETE", "OPTIONS"].forEach(item => {
    http[item.toLowerCase()] = function (url, config) {
        if (!_.isPlainObject(config)) config = {};
        config["url"] = url;
        config["method"] = item;
        return http(config);
    }
});

["POST", "PUT", "PATCH"].forEach(item => {
    http[item.toLowerCase()] = function (url, body, config) {
        if (!_.isPlainObject(config)) config = {}
        config["url"] = url
        config["body"] = body
        config["method"] = item
        return http(config)
    }
})

export default http;