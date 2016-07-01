import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, merged} from '../Tool';
import {DataLoad, DataNull, Header, TipMsgSignin, Footer, GetData} from './common/index';

/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    render() {
        var {data, loadAnimation, loadMsg, id, tabIndex} = this.props.state;
        var { User, params} = this.props;
        var main = <Content />
        if (!User) {
            main = <TipMsgSignin />
        } else if (!data) {
            main = <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        }

        return (
            <div>
                <Header title="消息" />
                {main}
                <Footer index="2" />
            </div>
        );
    }
}

class Content extends Component {
    render () {
        return (
            <div className="msg-box">
                <h2 className="tit">最新消息</h2>
            </div>
        );
    }
}

export default GetData({
    id: 'MyMessages',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/api/v1/messages', //服务器请求的地址
    stop: (props, state) => {
        return !Boolean(props.User); //true 拦截请求，false不拦截请求
    },
    data: (props, state) => { //发送给服务器的数据
        return { accesstoken: props.User.accesstoken }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});
