import {Tool, merged} from '../Tool';
/**
 * 获取列表
 * 
 * @param {any} _ID
 * @returns
 */
const List = (_ID) => {
    const cb = {
        /**
         * (默认状态)
         * 
         */
        DEFAULTS: () => {
            return {
                page: 1, //加载第几页数据
                nextBtn: true, //true开启分页插件，false关闭分页插件
                loadAnimation: true, //true显示加载动画，false 不显示加载动画
                loadMsg: '加载中', //加载提示
                limit: 10, //每次加载的条数
                scrollX: 0, //滚动条X
                scrollY: 0, //滚动条Y
                mdrender: false, //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
                data: [], //列表的数据
            }
        },
        /**
         * (分页开始加载)
         * 
         * @param state (状态)
         * @param target (更新目标)
         * @returns (更新后的内容)
         */
        GET_LATEST_LIST_DATA_START: (state, target) => {
            return merged(state, {
                loadAnimation: true,
                loadMsg: '正在拼命加载中'
            });
        },
        /**
         * (分页加载成功)
         * 
         * @param state (状态)
         * @param target (更新目标)
         * @returns (更新后的内容)
         */
        GET_LATEST_LIST_DATA_SUCCESS: (state, target) => {
            let {data} = target;
            if (!data.length && data.length < before.limit) {
                state.nextBtn = false;
                state.loadMsg = '没有了';
            } else {
                state.nextBtn = true;
                state.loadMsg = '上拉加载更多';
            }
            Array.prototype.push.apply(state.data, data);
            state.loadAnimation = false;
            state.page = ++state.page;

            return merged(state, {
                loadAnimation: true,
                loadMsg: '正在拼命加载中'
            });
        },
        /**
         * (分页加载失败)
         * 
         * @param state (状态)
         * @param target (更新目标)
         * @returns (更新后的内容)
         */
        GET_LATEST_LIST_DATA_ERROR: (state, target) => {
            return merged(state, {
                loadAnimation: false,
                loadMsg: '加载失败'
            });
        },
        /**
         * (组件卸载前，记录滚动条位置)
         * 
         * @param state (状态)
         * @param target (更新目标)
         */
        SETSCROLL: (state, target) => {
            state.scrollX = window.scrollX;
            state.scrollY = window.scrollY;
            return state;
        },
        /**
         * 重置默认状态，通过Link组件访问当前页面时，经常需要重置组件为默认状态
         * 
         * @param {any} state
         * @param {any} target
         * @returns
         */
        RESET_DEFAULT_STATE: (state, target) => {
            return cb.DEFAULTS();
        }
    };

    return (state = {}, action = {}) => {

        if (action._ID && action._ID !== _ID) {
            return state;
        } else if (cb[action.type]) {
            return cb[action.type](state, action.target);
        } else {
            return cb.DEFAULTS();
        }
    }
}

/**
 * 获取详情
 * 
 * @param {string} _ID
 * @returns object
 */
const View = (_ID) => {

    const cb = {
        DEFAULTS: () => {
            var defaults = {
                id: '', //当前页面的id
                loadAnimation: true, //true显示加载动画，false 不显示加载动画
                loadMsg: '加载中', //加载提示
                data: null, //页面的数据
                scrollX: 0, //滚动条X
                scrollY: 0, //滚动条Y 
                mdrender: true //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
            };
            defaults.defaults = merged(defaults);
            return defaults;
        },

        /**
         * 获取详情成功
         * 
         * @param {object} state
         * @param {object} target
         */
        GET_LATEST_VIEW_DATA_SUCCESS: (state, target) => {
            return merged(state, {
                id: target.data.id,
                loadMsg: '加载成功',
                loadAnimation: false,
                data: target.data
            });
        },

        /**
         * 获取详情失败
         * 
         * @param {object} state
         * @param {object} target
         */
        GET_LATEST_VIEW_DATA_ERROR: (state, target) => {
            return merged(state, {
                loadMsg: '加载失败',
                loadAnimation: false
            });
        },
        /**
         * (组件卸载前，记录滚动条位置)
         * 
         * @param state (状态)
         * @param target (更新目标)
         */
        SETSCROLL: (state, target) => {
            state.scrollX = window.scrollX;
            state.scrollY = window.scrollY;
            return merged(state);
        },
        /**
         * 重置默认状态，通过Link组件访问当前页面时，经常需要重置组件为默认状态
         * 
         * @param {object} state
         * @param {object} target
         * @returns object
         */
        RESET_DEFAULT_STATE: (state, target) => {
            return cb.DEFAULTS();
        }
    }
    return (state = {}, action = {}) => {

        if (action._ID && action._ID !== _ID) {
            return state;
        } else if (cb[action.type]) {
            return cb[action.type](state, action.target);
        } else {
            return cb.DEFAULTS();
        }
    }
}

/**
 * 用户详情
 * 
 * @param {string} _ID
 * @returns object
 */
const UserView = (_ID) => {

    const cb = {
        DEFAULTS: () => {
            var defaults = {
                loginname: '', //用户名称
                loadAnimation: true, //true显示加载动画，false 不显示加载动画
                loadMsg: '加载中', //加载提示
                tabIndex: 0, //tab索引
                data: null, //页面的数据
                scrollX: 0, //滚动条X
                scrollY: 0 //滚动条Y 
            };
            defaults.defaults = merged(defaults);
            return defaults;
        },
        /**
         * 获取详情成功
         * 
         * @param {object} state
         * @param {object} target
         */
        GET_LATEST_VIEW_DATA_SUCCESS: (state, target) => {
            return merged(state, {
                loginname: target.data.loginname,
                loadMsg: '加载成功',
                loadAnimation: false,
                data: target.data
            });
        },

        /**
         * 获取详情失败
         * 
         * @param {object} state
         * @param {object} target
         */
        GET_LATEST_VIEW_DATA_ERROR: (state, target) => {
            return merged(state, {
                loadMsg: '加载失败',
                loadAnimation: false
            });
        },
        /**
         * (组件卸载前，记录滚动条位置)
         * 
         * @param state (状态)
         * @param target (更新目标)
         */
        SETSCROLL: (state, target) => {
            state.scrollX = window.scrollX;
            state.scrollY = window.scrollY;
            return merged(state);
        },
        /**
         * 重置默认状态，通过Link组件访问当前页面时，经常需要重置组件为默认状态
         * 
         * @param {object} state
         * @param {object} target
         * @returns object
         */
        RESET_DEFAULT_STATE: (state, target) => {
            return cb.DEFAULTS();
        },
        /**
         * 更新
         * 
         * @param {object} state
         * @param {object} target
         * @returns object
         */
        UPDATE: (state, target) => {
            return merged(state, target);
        }
    }
    return (state = {}, action = {}) => {
        if (action._ID && action._ID !== _ID) {
            return state;
        } else if (cb[action.type]) {
            return cb[action.type](state, action.target);
        } else {
            return cb.DEFAULTS();
        }
    }
}

/**
 * 存储登录的用户信息
 * 
 * @param {string} [state=JSON.parse(Tool.localItem('User'))]
 * @param {object} action
 * @returns object
 */
const User = (state = JSON.parse(Tool.localItem('User')), action) => {

    switch (action.type) {
        case 'SIGNIN_SUCCESS': //登录成功
            Tool.localItem('User', JSON.stringify(action.target));
            return action.target;
        case 'SIGNOUT': //退出
            Tool.removeLocalItem('User');
            return null;
        default:
            return state;
    }

}

export default {
    IndexList: List('IndexList'),
    Topic: View('Topic'),
    UserView: UserView('UserView'),
    User
};