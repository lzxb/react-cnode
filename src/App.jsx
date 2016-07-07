import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import route from './Config/Route'; //路由配置
import store from './Config/Store';


import 'normalize.css'; //重置浏览器默认样式
import 'flex-css-layout'; //flex布局
import './Style/style.less'; //加载公共样式
import './Iconfont/iconfont.css'; //字体图标

store.subscribe(function () {
    // console.log(store.getState());
});

const init = () => {
    render(
        <Provider store={store}>
            {route}
        </Provider>,
        document.body.appendChild(document.createElement('div'))
    );
    if (window.APP_ENV == 'html5plus') {
        plus.navigator.closeSplashscreen();
    }

}
switch (window.APP_ENV) { //判断当前程序的运行环境
    case 'html5plus': //html5+运行环境
        if (window.plus) {
            init();
        } else {
            document.addEventListener('plusready', init, false);
        }
        break;
    default:
        init();
}

