import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, merged, GetNextPage} from '../Tool';
import {DataLoad, DataNull, Header, TipMsgSignin, Footer, UserHeadImg} from './common/index';

/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
        /**
         * 初始化状态
         * 
         * @param {object} props
         */
        this.initState = (props) => {
            let {state, params} = props;
            if (state.loginname === params.loginname) {
                this.state = state;
            } else {
                this.state = state.defaults;
                this.state.loginname = params.loginname;
            }
        }
        /**
         * DOM初始化完成后执行代码
         * 
         * @param {object} props
         */
        this.readyDOM = (props) => {
            let { GET_LATEST_VIEW_DATA_SUCCESS, GET_LATEST_VIEW_DATA_ERROR} = props;
            let {scrollX, scrollY} = this.state;
            var url = '/api/v1/user/' + this.state.loginname;
            this.get = Tool.get(url, {}, GET_LATEST_VIEW_DATA_SUCCESS, GET_LATEST_VIEW_DATA_ERROR);
            window.scrollTo(scrollX, scrollY); //设置滚动条位置
        }

        /**
         * 卸载前执行方法
         * 
         * @param {object} props
         */
        this.unmount = (props) => {
            if (this.get) {
                this.get.end();
                delete this.get;
            }
        }

        this.initState(this.props);
    }
    render() {
        var {data, loadAnimation, loadMsg, id, tabIndex} = this.state;
        var {UPDATE, User, params} = this.props;
        User = User ? User : {};
        var main = data ? <Home data={data} tabIndex={tabIndex} UPDATE={UPDATE} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        var title = params.loginname == User.loginname ? '个人中心' : params.loginname + '的个人中心';
        var footer = params.loginname == User.loginname ? <Footer index="3" /> : null;
        var leftIcon = params.loginname == User.loginname ? null : 'fanhui';

        return (
            <div>
                <Header title={title} leftIcon={leftIcon} />
                {main}
                {footer}
            </div>
        );
    }
    componentDidMount() {
        this.readyDOM(this.props);
    }
    componentWillReceiveProps(np) {
        this.initState(np);
    }
    componentWillUnmount() {
        this.props.SETSCROLL(); //记录滚动条位置
        this.get.end();
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
                <nav className="nav">
                    <ul data-flex="box:mean">
                        <li onClick={() => { this.props.UPDATE({ tabIndex: 0 }) } } className={arrOn[0]}>主题</li>
                        <li onClick={() => { this.props.UPDATE({ tabIndex: 1 }) } } className={arrOn[1]}>回复</li>
                    </ul>
                </nav>
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
                                <Link data-flex="box:last" to={'/topic/' + id}>
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

export default connect((state) => { return { state: state.UserView, User: state.User }; }, action('UserView'))(Main); //连接redux