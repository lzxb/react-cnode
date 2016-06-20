import merged from 'obj-merged';


const List = (_ID) => {

    var defaults = {
        _ID: _ID,
        defaults: {
            page: 1, //加载第几页数据
            nextBtn: true, //true开启分页插件，false关闭分页插件
            loadAnimation: true, //true显示加载动画，false 不显示加载动画
            loadMsg: '加载中', //加载提示
            data: [], //列表的数据
        },
        href: {}
    };

    return (state = {}, action = {}) => {
        if (state._ID && state._ID !== action._ID) return state;

        switch (action.type) {
            case 'GET_LATEST_LIST_DATA_START': //开始获取最新列表数据
                return merged(action.state);
            case 'GET_LATEST_LIST_DATA_SUCCESS': //获取最新列表数据成功
                return merged(action.state);
            case 'GET_LATEST_LIST_DATA_ERROR': //获取最新列表数据失败
                return merged(action.state);
            case 'SETSCROLL': //记录组件卸载前的滚动条位置
                return merged(action.state); //涅槃对象
            case 'RESET_DEFAULT_STATE': //重置默认状态
                return merged(state); //涅槃对象
            default:
                return merged(state, defaults); //返回默认状态
        }
    }
}

/**
 * (首页列表)
 * 
 * @param [state] (状态)
 * @param [action] (行为)
 * @returns (返回更新的状态)
 */
const IndexList = (state = {}, action = {}) => {

    if (state._ID && state._ID !== action._ID) return state;

    switch (action.type) {
        case 'GET_LATEST_LIST_DATA_START': //开始获取最新列表数据
        case 'GET_LATEST_LIST_DATA_SUCCESS': //获取最新列表数据成功
        case 'GET_LATEST_LIST_DATA_ERROR': //获取最新列表数据失败
        case 'SETSCROLL': //记录组件卸载前的滚动条位置
        case 'RESET_DEFAULT_STATE': //重置默认状态
        default:
            return merged(state, { _ID: 'IndexList' }); //返回默认状态
    }

}

export default { IndexList };