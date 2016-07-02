export default (_ID) => {
    var action = {};
    var arr = [
        'signinSuccess', //登录成功
        'signin', //退出登录
        'setState' //设置状态
    ];

    for (let i = 0; i < arr.length; i++) { 
        action[arr[i]] = (target) => {
            return { _ID: _ID, target: target, type: arr[i] };
        }
    }

    return action;
} 