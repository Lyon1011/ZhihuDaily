# 知乎日报

## 项目概况

- 首页(轮播图/新闻详情/懒加载)

    ![首页](https://github.com/Lyon1011/ZhihuDaily/raw/main/images/首页.gif)

- 个人中心/收藏

    ![](https://github.com/Lyon1011/ZhihuDaily/raw/main/images/个人中心.gif)

- 信息更新

    ![](https://github.com/Lyon1011/ZhihuDaily/raw/main/images/更新信息.gif)

- 登录

    ![](https://github.com/Lyon1011/ZhihuDaily/raw/main/images/登录.gif)

## 前端技术栈

- creat-react-app
- React18
- redux/react-redux
- react-router-dom V6
- fetch
- less/styled-components
- AntdMobile

## 项目目录
```
|-- build
|-- config
|-- package-lock.json
|-- package.json
|-- public
|   |-- favicon.ico
|   `-- index.html // 入口文件
|-- scripts
|   |-- build.js
|   |-- start.js
|   `-- test.js
|-- src
|   |-- App.jsx
|   |-- api
|   |   |-- http.js // 封装好的fetch
|   |   `-- index.js // 通过封装好的fetch调用API访问后台并返回数据
|   |-- assets
|   |   |-- images // 静态图片资源
|   |   |-- reset.min.css // 封装好的全局css初始化组件
|   |   `-- utils.js // 封装好的工具类
|   |-- components
|   |   |-- ButtonAgain.jsx // 对AntdMobile下的Button的二次封装组件
|   |   |-- HomeHead.css
|   |   |-- HomeHead.css.map
|   |   |-- HomeHead.jsx // 导航栏组件
|   |   |-- HomeHead.less
|   |   |-- NavBarAgain.jsx // 对AntdMobile下的NavBar的二次封装组件
|   |   |-- NewsItem.css
|   |   |-- NewsItem.css.map
|   |   |-- NewsItem.jsx // 单个新闻组件
|   |   |-- NewsItem.less
|   |   |-- SkeletonAgain.css // 对AntdMobile下的Skeleton的二次封装组件
|   |   |-- SkeletonAgain.css.map
|   |   |-- SkeletonAgain.jsx
|   |   `-- SkeletonAgain.less
|   |-- index.css
|   |-- index.css.map
|   |-- index.js
|   |-- index.less // 全局样式
|   |-- router
|   |   |-- index.js // 封装路由组件
|   |   `-- routes.js // 路由表
|   |-- setupProxy.js // 跨域代理
|   |-- store
|   |   |-- action // redux-action
|   |   |-- action-type.js
|   |   |-- index.js // redux-store中间件设置和reducer使用
|   |   `-- reducer // redux-reducer
|   `-- views
|       |-- Detail.css
|       |-- Detail.css.map
|       |-- Detail.jsx // 新闻详情
|       |-- Detail.less
|       |-- Home.css
|       |-- Home.css.map
|       |-- Home.jsx // 首页
|       |-- Home.less
|       |-- Login.jsx // 登录界面
|       |-- Page404.jsx // 出错网页
|       |-- Personal.jsx // 个人中心
|       |-- Store.jsx // 收藏列表
|       |-- Update.jsx // 更新个人信息
|       |-- login.css
|       |-- login.css.map
|       `-- login.less
`-- yarn.lock

```

## 项目亮点

- 对 `Antd-Mobile` 中频繁使用或使用上操作相同的组件进行了二次封装
- 实现了 `REM ` 响应式布局和样式处理
- 对 `fetch` 进行了二次封装
- 封装了常用的工具类及样式重置文件

## 项目启动

- 在 `zhihu-admin`  目录下使用 `yarn start` 打开后台, 得到返回语句 `THE WEB SERVICE SUCCESSFULLY AND LISTENING TO THE PORT：7100！`  则代表启动成功
- 在 `zhihu-daily` 目录下使用 `yarn start` 打开, 连接至后台后返回数据
- 项目的设计稿是750px, 响应式布局针对750px做了向下兼容, 大于750px可能显示会不正常
- 若返回数据出错, 大概率是知乎官方犯病, 要点击控制台返回的链接进行验证

## Q & A

> components 下的组件为什么没有用单个文件夹存放

开始搭建骨架时组件并不多, 而且初衷是认为可以依靠 `styled-componets` 控制样式所以不会有很多的 `css/less` 文件, 后续会对文件进行更新, 让结构更加合理

> 问什么会采用 `styled-components`  和 `css/less` 混用的方式

项目采用的 `REM` 响应式布局是通过使用 `lib-flexible` 和 `postcss-pxtorem` 实现的, 前者可以设置 `REM` 和 `px` 的换算比例, 后者可以将 `px` 自动转化为 `REM` , 但是这两者不支持 `styled-components` 这种将样式写在 `js/jsx` 文件的方式, 只能识别 `css/less` 文件, 所以项目的前期使用了后者的方式; 后期在网上找到了可以让 `lib-flexible` 和 `postcss-pxtorem` 也能支持 `styled-components` 的插件后就减少了 `css/less` 文件的使用. 后续我也会统一改为一种方式, 让结构合理化

> 项目的后台情况

项目的后台不是自己写的, 具体工作方式是使用知乎官方的API进行数据获取, 以及后台研发的个人中心系统, 这些数据存储在了 `JSON` 文件中