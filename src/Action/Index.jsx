export default (_ID) => {
    const action = {};
    const GET_LATEST_LIST_DATA_START = 'GET_LATEST_LIST_DATA_START'; //开始获取最新列表数据
    const GET_LATEST_LIST_DATA_SUCCESS = 'GET_LATEST_LIST_DATA_SUCCESS'; //获取最新列表数据成功
    const GET_LATEST_LIST_DATA_ERROR = 'GET_LATEST_LIST_DATA_ERROR'; //获取最新列表数据失败
    const SETSCROLL = 'SETSCROLL'; //记录组件卸载前的滚动条位置
    const RESET_DEFAULT_STATE = 'RESET_DEFAULT_STATE'; //重置默认状态

    /**
     * (获取最新列表数据：开始)
     * 
     * @param state (状态)
     * @returns (返回需要更新的数据)
     */
    action.GET_LATEST_LIST_DATA_START = (href, state) => {
        state.href[href].loadAnimation = true;
        state.href[href].loadMsg = '正在拼命加载中';
        return { _ID, state, type: GET_LATEST_LIST_DATA_START };
    }

    /**
     * (获取最新列表数据：成功)
     * 
     * @param state (状态)
     * @returns (返回需要更新的数据)
     */
    action.GET_LATEST_LIST_DATA_SUCCESS = (href, state, data) => {
        state.href[href].loadAnimation = false;
        state.href[href].loadMsg = '上拉加载更多';
        state.href[href].data = data;
        return { _ID, state, type: GET_LATEST_LIST_DATA_SUCCESS };
    }

    /**
     * (获取最新列表数据：失败)
     * 
     * @param state (状态)
     * @returns (返回需要更新的数据)
     */
    action.GET_LATEST_LIST_DATA_ERROR = (href, state) => {
        state.href[href].loadAnimation = false;
        state.href[href].loadMsg = '加载失败';
        return { _ID, state, type: GET_LATEST_LIST_DATA_ERROR };
    }

    /**
     * (记录滚动条位置)
     * 
     * @param state (状态)
     * @returns (返回需要更新的数据)
     */
    action.SETSCROLL = (href, state) => {
        state.href[href].scrollX = window.scrollX;
        state.href[href].scrollY = window.scrollY;
        return { _ID, type: SETSCROLL };
    }

    /**
     * (重置状态值，恢复初始状态)
     * 
     * @param state (状态)
     * @returns (返回需要更新的数据)
     */
    action.RESET_DEFAULT_STATE = (href, state) => {
        state.href[href] = state.defaults;
        return { _ID, type: RESET_DEFAULT_STATE };
    }

    return action;
} 