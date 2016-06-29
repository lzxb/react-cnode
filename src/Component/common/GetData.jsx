import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import {Tool, merged, GetNextPage} from '../../Tool';
import {DataLoad, DataNull, Header, TipMsgSignin, Footer, UserHeadImg} from './index';


const Main = (seting) => {

    /**
     * 模块入口
     * 
     * @class Index
     * @extends {Component}
     */
    class Index extends Component {
        constructor(props) {
            super(props);
            this.initState = (props) => {
                var {state, location} = props;
                var {pathname, search} = location;
                this.href = pathname + search;
                if (state.href === this.href) {
                    this.state = state;
                } else {
                    this.state = merged(state.defaults); //复制默认对象
                    this.state.href = this.href;
                }
            }


            this.readyDOM = () => {
                var {props, state, } = this;
                var {SETSTATE} = props;
                let {scrollX, scrollY} = state;
                if (this.get) return false; // 已经请求过，无需重复请求
                var url = typeof seting.url === 'function' ? seting.url(props, this.state) : seting.url;
                var data = typeof seting.data === 'function' ? seting.data(props, this.state) : seting.data;
                window.scrollTo(scrollX, scrollY); //设置滚动条位置
                this.get = Tool.get(url, data, (res) => {
                    state.loadMsg = '加载成功';
                    state.loadAnimation = false;
                    state.data = res.data;
                    SETSTATE(state);
                }, () => {
                    state.loadMsg = '加载失败';
                    state.loadAnimation = false;
                    SETSTATE(state);
                });
            }

            this.unmount = (props) => {
                this.get.end();
                delete this.get;
            }

            this.initState(this.props);
        }
        render() {
            return <seting.Render {...this.props} state={this.state} />;
        }
        componentDidMount() {
            this.readyDOM();
        }
        componentWillReceiveProps(np) {
            var {pathname, search} = np.location;
            var href = pathname + search;
            if (href !== this.href) { //地址没有改变，更改状态即可
                this.unmount();
            }
            this.initState(np);
        }
        componentDidUpdate() {
            this.readyDOM();
        }
        componentWillUnmount() {
            this.unmount();
            var {state} = this;
            state.scrollX = window.scrollX;
            state.scrollY = window.scrollY;
            this.props.SETSTATE(state); //记录滚动条位置
        }
    }

    return connect((state) => { return { state: state[seting.id], User: state.User }; }, action(seting.id))(Index); //连接redux
}
export default Main;