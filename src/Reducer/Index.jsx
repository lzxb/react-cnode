import merged from 'obj-merged';

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

export default {IndexList};