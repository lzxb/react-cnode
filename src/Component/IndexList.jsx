import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, merged, GetNextPage} from '../Tool';
import {DataLoad, Footer, UserHeadImg} from './common/index';


/**
 * (导航分类)
 * 
 * @class Nav
 * @extends {Component} 
 */
class Nav extends Component {
    render() {
        var setCur = {};
        setCur[this.props.tab] = 'on';
        return (
            <nav className="index-nav">
                <ul data-flex="box:mean">
                    <li className={setCur.all}>
                        <Link to="/" activeClassName="active">全部</Link>
                    </li>
                    <li className={setCur.good}>
                        <Link to="/?tab=good" activeClassName="active">精华</Link>
                    </li>
                    <li className={setCur.share}>
                        <Link to="/?tab=share" activeClassName="active">分享</Link>
                    </li>
                    <li className={setCur.ask}>
                        <Link to="/?tab=ask" activeClassName="active">问答</Link>
                    </li>
                    <li className={setCur.job}>
                        <Link to="/?tab=job" activeClassName="active">招聘</Link>
                    </li>
                </ul>
                <div className="height"></div>
            </nav>
        );
    }
}

/**
 * (循环列表)
 * 
 * @class List
 * @extends {Component}
 */
class List extends Component {
    render() {
        return (
            <ul className="index-list">
                {
                    this.props.list.map((item, index) => {
                        let {id, title, author, visit_count, reply_count, create_at, last_reply_at} = item;
                        return (
                            <li key={index}>
                                <Link to={"/topic/" + id}>
                                    <h3 className="tit">{title}</h3>
                                    <div className="bottom" data-flex="box:first">
                                        <div className="author" data-flex="cross:center">
                                            <UserHeadImg url={author.avatar_url} />
                                        </div>
                                        <div className="con" data-flex="dir:top main:center">
                                            <p data-flex="cross:center box:last">
                                                <span class="name">{author.loginname}</span>
                                                <span className="count">{reply_count}/{visit_count}</span>
                                            </p>
                                            <p data-flex="cross:center box:last">
                                                <time className="create">{Tool.formatDate(create_at) }</time>
                                                <time className="re">{Tool.formatDate(last_reply_at) }</time>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

/**
 * (导出组件)
 * 
 * @export
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);

        /**
         * (DOM渲染完成之后执行)
         * 
         */
        this.redayDOM = (props) => {

            let {location, state, GET_LATEST_LIST_DATA_START, GET_LATEST_LIST_DATA_SUCCESS, GET_LATEST_LIST_DATA_ERROR} = props;
            let {data, page, limit, mdrender, nextBtn, scrollX, scrollY} = state;

            if (this.GetNextPage || !nextBtn) return false; //如果已经开启了分页插件，或不需要开启分页，进行拦截，避免造成无限循环
            window.scrollTo(scrollX, scrollY); //设置滚动条位置
            this.GetNextPage = new GetNextPage(this.refs.dataload, {
                url: '/api/v1/topics',
                data: {
                    tab: location.query.tab || 'all',
                    page,
                    limit,
                    mdrender
                },
                start: GET_LATEST_LIST_DATA_START,
                load: GET_LATEST_LIST_DATA_SUCCESS,
                error: GET_LATEST_LIST_DATA_ERROR
            });
        }

        this.unmount = (props) => {
            if (this.GetNextPage) {
                this.GetNextPage.end();
                delete this.GetNextPage;
            }
        }

    }
    render() {
        let {data, loadAnimation, loadMsg} = this.props.state;
        let tab = this.props.location.query.tab || 'all';
        return (
            <div>
                <Nav tab={tab} />
                {
                    data.length > 0 ? <List list={data} /> : null
                }
                <div ref="dataload"><DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} /></div>
                <Footer index="0" />
            </div>
        );
    }
    componentDidMount() {
        this.redayDOM(this.props);
    }
    shouldComponentUpdate(np) {
        if (this.props.location.search != np.location.search) {
            this.unmount(this.props);
            this.props.RESET_DEFAULT_STATE(); //重置成初始状态
            return false;
        }
        return true;
    }
    componentDidUpdate() {
        this.redayDOM(this.props);
    }
    componentWillUnmount() {
        this.unmount(this.props);
        this.props.SETSCROLL(); //记录滚动条位置
    }
}

export default connect((state) => { return { state: state.IndexList }; }, action('IndexList'))(Main); //连接redux