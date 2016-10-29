import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, Footer } from './common/index';

/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: '登录'
        };
        this.signin = () => {
            var accesstoken = this.refs.accesstoken.value;
            if (!accesstoken) return alert('不能为空！');
            this.setState({ button: '登录中...' });
            Tool.post('/api/v1/accesstoken', { accesstoken }, (res) => {
                if (res.success) {
                    alert('登录成功');
                    res.accesstoken = accesstoken;
                    this.props.signinSuccess(res);
                    this.context.router.push({
                        pathname: '/user/' + res.loginname
                    });
                } else {
                    alert('登录失败');
                    this.setState({ button: '登录' });
                }

            }, () => {
                alert('登录失败！');
                this.setState({ button: '登录' });
            });
        }

    }
    render() {
        return (
            <div>
                <Header title="登录" leftIcon="fanhui" />
                <div className="signin" data-flex="dir:top main:center cross:center">
                    <div className="center">
                        <div className="text"><input ref="accesstoken" type="text" placeholder="Access Token" /></div>
                        <button className="btn" onClick={this.signin}>{this.state.button}</button>
                    </div>
                </div>
            </div>
        );
    }
}
Main.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default connect((state) => { return { User: state.User }; }, action('User'))(Main); //连接redux