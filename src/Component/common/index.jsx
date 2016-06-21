import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {Tool, merged, GetNextPage} from '../../Tool';


/**
 * (加载动画)
 * 
 * @class DataLoad
 * @extends {Component}
 */
export class DataLoad extends Component {
    render() {
        let {loadAnimation, loadMsg} = this.props;
        return (
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>
        );
    }
}
DataLoad.defaultProps = {
    loadAnimation: true, //默认显示加载动画
    loadMsg: '正在加载中'
}

