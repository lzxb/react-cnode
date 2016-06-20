import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';


/**
 * (导航分类)
 * 
 * @class Nav
 * @extends {Component}
 */
class Nav extends Component {
    render() {
        return (
            <nav className="index-nav">
                <ul data-flex="box:mean">
                    <li className="on">
                        <Link to="/?tab=all" activeClassName="active">全部</Link>
                    </li>
                    <li>
                        <Link to="/?tab=good" activeClassName="active">精华</Link>
                    </li>
                    <li>
                        <Link to="/?tab=share" activeClassName="active">分享</Link>
                    </li>
                    <li>
                        <Link to="/?tab=ask" activeClassName="active">问答</Link>
                    </li>
                    <li>
                        <Link to="/?tab=job" activeClassName="active">招聘</Link>
                    </li>
                </ul>
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
                <li>
                    <Link to="/">
                        <h3 className="tit">标题标题标题标题标题标题标题标题标题标题标题标题</h3>
                        <div className="bottom" data-flex="box:first">
                            <div className="author" data-flex="cross:center">
                                <div className="pictrue">
                                    <img src="http://gravatar.com/avatar/871c4ba6d25169779cee977e04b2f0c3?s=48" />
                                </div>
                            </div>
                            <div className="con" data-flex="dir:top main:center">
                                <p data-flex="cross:center box:last">
                                    <span class="name">狼族小狈</span>
                                    <span className="count">55/888</span>
                                </p>
                                <p data-flex="cross:center box:last">
                                    <time className="create">1年前</time>
                                    <time className="re">1分钟前</time>
                                </p>
                            </div>
                        </div>
                    </Link>
                </li>
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


        this.redayDOM = (props) => {

        }
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <Nav />
                <List />
                <i className="iconfont icon-job"></i>
                <div className="data-load data-load-true">
                    <div className="msg">说明</div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.redayDOM(this.props);
    }
    shouldComponentUpdate() {

    }
    componentDidUpdate() {
        this.redayDOM(this.props);
    }
    omponentWillUnmount() {

    }
}

export default connect((state) => { return { state: state.IndexList }; }, action('IndexList'))(Main); //连接redux