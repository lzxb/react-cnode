import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();


import IndexList from '../Component/IndexList'; //首页组件
// import Topic from '../Component/Topic'; //主题详情
// import TopicCreate from '../Component/TopicCreate'; //发布主题
// import MyMessages from '../Component/MyMessages'; //我的消息
// import UserView from '../Component/UserView'; //我的个人中心
// import Signin from '../Component/Signin'; //登录
// import Signout from '../Component/Signout'; //退出
import getComponent from '../Component/common/getComponent';
const routes = [
	{ path: '/',
		exact: true,
		component: IndexList
	},
	{ path: '/topic/create',
		exact: false,
		component: (props) => getComponent(props, () => import('../Component/TopicCreate'))
	},
	{ path: '/topic/:id',
		exact: false,
		component: (props) => getComponent(props, () => import('../Component/Topic'))
	},
	{ path: '/my/messages',
		exact: false,
		component: (props) => getComponent(props, () => import('../Component/MyMessages'))
	},
	{ path: '/user/:loginname',
		exact: false,
		component: (props) => getComponent(props, () => import('../Component/UserView'))
	},
	{ path: '/signin',
		exact: false,
		component: (props) => getComponent(props, () => import('../Component/Signin'))
	},
	{ path: '/signout',
		exact: false,
		component: (props) => getComponent(props, () => import('../Component/Signout'))
	}
];
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
// var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
const supportsHistory = 'pushState' in window.history;
let Router = process.env.NODE_ENV !== 'production' ? BrowserRouter : HashRouter;
const RouteConfig = (
    <Router  history={history}>
	    <Switch>
	      {/*<Route path="/" exact component={IndexList} />*/}
		    {routes.map((route, index) => (
			    <Route
				    key={index}
				    path={route.path}
				    exact={route.exact}
				    component={route.component}
			    />
		    ))}
		    {/*<Route path="/topic/create" component={TopicCreate} />*/}
		    {/*<Route path="/topic/:id" component={Topic} />*/}
		    {/*<Route path="/my/messages" component={MyMessages} />*/}
		    {/*<Route path="/user/:loginname" component={UserView} />*/}
		    {/*<Route path="/signin" component={Signin} />*/}
		    {/*<Route path="/signout" component={Signout} />*/}
		    <Redirect from='' to="/" />
	    </Switch>
    </Router>
);

export default RouteConfig;