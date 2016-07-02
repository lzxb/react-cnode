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
    constructor(props) {
        super(props);
        this.rightClick = () => {
            console.log('提交');
        }
    }
    render() {
        var {loadAnimation, loadMsg, id} = this.props.state;
        var { User} = this.props;
        var main = null;
        if (!User) {
            main = <TipMsgSignin />
        } else {
            main = <NewTopic />
        }
        return (
            <div>
                <Header title="发表主题" rightIcon="fabu" rightClick={this.rightClick}/>
                {main}
                <Footer index="1" />
            </div>
        );
    }
    componentDidMount() {

    }
    componentWillReceiveProps() {

    }
    componentWillUnmount() {

    }
}

class NewTopic extends Component {
    render() {
        return (
            <div className="topic-create">
                <div className="item">
                    <select name="tab">
                        <option value="">请选择发表类型</option>
                        <option value="share">分享</option>
                        <option value="ask">问答</option>
                        <option value="job">招聘</option>
                    </select>
                </div>
                <div className="item">
                    <input type="text" placeholder="标题字数 10 字以上" />
                </div>
                <div className="item">
                    <textarea placeholder="内容字数 30 字以上"></textarea>
                </div>
            </div>
        );
    }
}


export default GetData({
    id: 'TopicCreate',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    stop: (props, state) => {
        return false; //true 拦截请求，false不拦截请求
    },
    data: (props, state) => { //发送给服务器的数据
        return { accesstoken: props.User.accesstoken }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});