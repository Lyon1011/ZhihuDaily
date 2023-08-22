# 知乎日报
## 技术栈
- creat-react-app
- React18
- redux/react-redux
- react-router-dom V6
- Fetch
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