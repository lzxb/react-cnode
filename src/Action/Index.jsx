export default (_ID) => {
    var action = {};
    var arr = [
        'GET_LATEST_LIST_DATA_START', //开始获取最新数据
        'GET_LATEST_LIST_DATA_SUCCESS', //获取最新数据成功
        'GET_LATEST_LIST_DATA_ERROR', //获取最新数据失败
        'GET_LATEST_VIEW_DATA_SUCCESS', //获取页面详情成功
        'GET_LATEST_VIEW_DATA_ERROR', //获取页面详情失败
        'SETSCROLL', //组件卸载前记录滚动条位置
        'RESET_DEFAULT_STATE', //重置默认状态
        'SIGNIN_SUCCESS', //登录成功
        'SIGNOUT', //退出登录
        'UPDATE' //更新
    ];

    for (let i = 0; i < arr.length; i++) { 
        action[arr[i]] = (target) => {
            return { _ID: _ID, target: target, type: arr[i] };
        }
    }

    return action;
} 