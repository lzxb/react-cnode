import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, merged, GetNextPage} from '../Tool';
import {DataLoad, DataNull, Header, TipMsgSignin, Footer, GetData} from './common/index';

/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    render() {

        return (
            <div>
                <Header title="消息" />
                <TipMsgSignin />
                <Footer index="2" />
            </div>
        );
    }
}


export default GetData({
    id: 'MyMessages', //唯一的id标识
    url: '/api/v1/messages', //服务器请求的地址
    data: (props, state) => { //发送给服务器的数据
        return { accesstoken: props.User.accesstoken }
    },
    Render: Main //渲染视图组件
});