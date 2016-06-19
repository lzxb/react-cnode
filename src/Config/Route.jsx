import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import IndexList from '../Component/IndexList'; //首页组件

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
    render() {

        return (
            <div>{this.props.children}</div>
        );
    }
}

const RouteConfig = (
    <Router history={browserHistory}>
        <Route path="/" component={Roots}>
            <IndexRoute component={IndexList} />
        </Route>
    </Router>
);

export default RouteConfig;