import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, merged, GetNextPage} from '../Tool';
import {DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg} from './common/index';

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
         * 初始化组件状态
         * 
         * @returns
         */
        this.initState = (props) => {
            let {state, params} = props;
            if (state.id === params.id) {
                this.state = state;
            } else {
                this.state = state.defaults;
            }
        }

        /**
         * DOM初始化完成后执行代码
         * 
         * @param {any} props
         */
        this.readyDOM = (props) => {
            let { GET_LATEST_VIEW_DATA_SUCCESS, GET_LATEST_VIEW_DATA_ERROR} = props;
            let {scrollX, scrollY, mdrender} = this.state;
            var url = '/api/v1/topic/' + (props.params.id || '');
            this.get = Tool.get(url, { mdrender }, GET_LATEST_VIEW_DATA_SUCCESS, GET_LATEST_VIEW_DATA_ERROR);
            window.scrollTo(scrollX, scrollY); //设置滚动条位置
        }

        this.initState(this.props);
    }
    render() {
        var {data, loadAnimation, loadMsg, id} = this.state;

        var main = data ? <Article {...data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return (
            <div>
                <Header title="详情" leftIcon="fanhui" />
                {main}
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

export default connect((state) => { return { state: state.Topic }; }, action('Topic'))(Main); //连接redux