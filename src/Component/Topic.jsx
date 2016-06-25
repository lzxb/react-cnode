import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, merged, GetNextPage} from '../Tool';
import {DataLoad, DataNull, Header} from './common/index';

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
            if(state.id === params.id) {
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
            this.get = Tool.get(url, { mdrender}, GET_LATEST_VIEW_DATA_SUCCESS, GET_LATEST_VIEW_DATA_ERROR);
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
    componentWillReceiveProps (np) {
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
        var {title, create_at, visit_count, reply_count, content, replies} = this.props;
        var createMarkup = () => {
            return {
                __html: content
            };
        }
        return (
            <div className="topic">
                <h2 className="tit2">{title}</h2>
                <div className="top-value" data-flex>
                    <div flex-box="0">阅读：{visit_count}</div>
                    <div flex-box="0">回复：{reply_count}</div>
                    <div flex-box="1">发表时间：{create_at}</div>
                </div>
                <div className="content" dangerouslySetInnerHTML={createMarkup() } />
                <h3 className="tit3">回复</h3>
                <ReList list={replies} />
            </div>
        );
    }
}

class ReList extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.list.map((item, index) => {
                        var {id, content} = item;
                        var createMarkup = () => {
                            return {
                                __html: content
                            };
                        }
                        return (
                            <li key={id}>
                                <div dangerouslySetInnerHTML={createMarkup() } />
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

export default connect((state) => { return { state: state.Topic }; }, action('Topic'))(Main); //连接redux