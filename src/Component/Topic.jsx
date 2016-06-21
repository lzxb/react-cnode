import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, API, merged, GetNextPage} from '../Tool';
import {DataLoad} from './common/index';

class Main extends Component {
    render() {
        return (
            <div>
                <header className="common-header" data-flex>
                    <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                        <i className="iconfont icon-fanhui"></i>
                    </div>
                    <h2 className="title" data-flex-box="1">详情</h2>
                    <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                    </div>
                </header>
            </div>
        );  
    }
}

export default Main;