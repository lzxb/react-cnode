import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, merged} from '../Tool';
import {DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData} from './common/index';

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
        var {data, loadAnimation, loadMsg, id} = this.props.state;
        var main = data ? <Article {...data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return (
            <div>
                <Header title="详情" leftIcon="fanhui" />
                {main}
            </div>
        );
    }
}

/**
 * 文章主体部分
 * 
 * @class Article
 * @extends {Component}
 */
class Article extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var {title, create_at, visit_count, reply_count, content, replies, author} = this.props;
        var createMarkup = () => {
            return {
                __html: content
            };
        }
        return (
            <div className="topic">
                <div className="user" data-flex>
                    <div className="headimg" data-flex-box="0">
                        <UserHeadImg url={author.avatar_url} />
                    </div>
                    <div className="data" data-flex="dir:top" data-flex-box="1">
                        <div data-flex="main:justify">
                            <Link to={'/user/' + author.loginname} className="name">{author.loginname}</Link>
                            <time data-flex-box="1">{Tool.formatDate(create_at) }</time>
                            <div className="lou">#楼主</div>
                            <div className="font" data-flex="main:center cross:center"><TabIcon {...this.props} /></div>
                        </div>
                        <div className="qt" data-flex>
                            <div>阅读：{visit_count}</div>
                            <div>回复：{reply_count}</div>
                        </div>
                    </div>
                </div>
                <h2 className="tit2">{title}</h2>
                <div className="content" dangerouslySetInnerHTML={createMarkup() } />
                <h3 className="tit3">共<em>{replies.length}</em>条回复</h3>
                <ReList list={replies} />
                <TipMsgSignin />

            </div>
        );
    }
}
//                <ReplyBox />
/**
 * 回复列表
 * 
 * @class ReList
 * @extends {Component}
 */
class ReList extends Component {
    render() {
        return (
            <ul className="re-list">
                {
                    this.props.list.map((item, index) => {
                        var {id, content, author, ups, create_at} = item;
                        var at = new Date(create_at);
                        var createMarkup = () => {
                            return {
                                __html: content
                            };
                        }
                        return (
                            <li key={id} data-flex>
                                <div className="headimg" data-flex-box="0">
                                    <UserHeadImg url={author.avatar_url} />
                                </div>
                                <div className="main" data-flex-box="1">
                                    <div data-flex="main:justify">
                                        <Link to={'/user/' + author.loginname} className="name">{author.loginname}</Link>
                                        <time data-flex-box="1">{Tool.formatDate(create_at) }</time>
                                        <div className="lou">#{++index}</div>
                                    </div>
                                    <div className="content" dangerouslySetInnerHTML={createMarkup() }></div>
                                    <div className="bottom" data-flex="main:right">
                                        <div className="font">
                                            <i className="iconfont icon-dianzan"></i>
                                            <em>{ups.length ? ups.length : ''}</em>
                                        </div>
                                        <div className="font">
                                            <i className="iconfont icon-huifu"></i>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

/**
 * 回复框
 * 
 * @class ReplyBox
 * @extends {Component}
 */
class ReplyBox extends Component {
    render() {
        return (
            <div className="reply-box">
                <div className="text"><textarea placeholder="发表你的看法..."></textarea></div>
                <div data-flex="main:right">
                    <button className="btn">回复</button>
                </div>
            </div>
        );
    }
}

export default GetData({
    id: 'Topic',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        return '/api/v1/topic/' + (props.params.id || '');
    },
    data: (props, state) => { //发送给服务器的数据
        return { mdrender: state.mdrender }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});