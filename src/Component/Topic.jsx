import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import {Tool, merged, GetNextPage} from '../Tool';
import {DataLoad, Header} from './common/index';

class Main extends Component {
    constructor(props) {
        super(props);


        this.readyDOM = (props) => {
            let {GET_LATEST_VIEW_DATA_SUCCESS, GET_LATEST_VIEW_DATA_ERROR} = props;
            var url = '/api/v1/topic/' + (props.params.id || '');
            Tool.get(url, { mdrender: false }, (res) => {
                GET_LATEST_VIEW_DATA_SUCCESS(res.data);
            }, GET_LATEST_VIEW_DATA_ERROR);
        }

    }
    render() {
        return (
            <div>
                <Header title="详情" leftIcon="fanhui" />
            </div>
        );
    }
    componentDidMount() {
        this.readyDOM(this.props);
    }
}

export default connect((state) => { return { state: state.Topic }; }, action('Topic'))(Main); //连接redux