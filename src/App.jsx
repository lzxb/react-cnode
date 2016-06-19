import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import route from './Config/Route';
import store from './Config/Store';


import 'normalize.css'; //重置浏览器默认样式
import 'flex-css-layout'; //flex布局
import './Style/style.less'; //加载公共样式
import './Iconfont/iconfont.css';

store.subscribe(function () {
    console.log(store.getState());
});

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);