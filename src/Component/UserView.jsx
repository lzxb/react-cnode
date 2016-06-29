import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, merged, GetNextPage} from '../Tool';
import {DataLoad, DataNull, Header, TipMsgSignin, Footer, UserHeadImg, GetData} from './common/index';

/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var {data, loadAnimation, loadMsg, id, tabIndex} = this.props.state;
        var {SETSTATE, User, params} = this.props;
        User = User ? User : {};
        var main = data ? <Home data={data} tabIndex={tabIndex} SETSTATE={SETSTATE} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        var title = params.loginname == User.loginname ? '个人中心' : params.loginname + '的个人中心';
        var footer = params.loginname == User.loginname ? <Footer index="3" /> : null;
        var leftIcon = params.loginname == User.loginname ? null : 'fanhui';
        var rightIcon = params.loginname == User.loginname ? 'tuichu' : null;
        return (
            <div>
                <Header title={title} leftIcon={leftIcon} rightIcon={rightIcon} rightTo="/signout"/>
                {main}
                {footer}
            </div>
        );
    }
}

class Home extends Component {
    render() {
        var {avatar_url, loginname, score, recent_topics, recent_replies} = this.props.data;
        var {tabIndex} = this.props;
        var arrOn = [];
        var arrDisplay = [];
        arrOn[tabIndex] = 'on';
        arrDisplay[tabIndex] = 'block';
        return (
            <div className="user-index">
                <div className="headimg" data-flex="dir:top main:center cross:center">
                    <UserHeadImg url={avatar_url} />
                    <div className="name">{loginname}</div>
                    <div className="score">积分：{score}</div>
                </div>
                <ul className="tab-nav" data-flex="box:mean">
                    <li onClick={() => { this.props.SETSTATE({ tabIndex: 0 }) } } className={arrOn[0]}>主题</li>
                    <li onClick={() => { this.props.SETSTATE({ tabIndex: 1 }) } } className={arrOn[1]}>回复</li>
                </ul>
                <HomeList list={recent_topics} display={arrDisplay[0]} />
                <HomeList list={recent_replies} display={arrDisplay[1]} />
            </div>
        );
    }
}

class HomeList extends Component {
    render() {
        var {list, display} = this.props;
        return (
            <ul className="list" style={{ display: display }}>
                {
                    list.map((item, index) => {
                        let {id, title, last_reply_at} = item;
                        return (
                            <li key={index}>
                                <Link data-flex="box:last" to={`/topic/${id}`}>
                                    <div className="tit">{title}</div>
                                    <time className>{Tool.formatDate(last_reply_at) }</time>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}
export default GetData({
    id: 'UserView', //唯一的id标识
    url: (props, state) => {
        return '/api/v1/user/' + props.params.loginname;
    }, //服务器请求的地址
    data: {},
    Render: Main //渲染视图组件
});
// export default connect((state) => { return { state: state.UserView, User: state.User }; }, action('UserView'))(Main); //连接redux