# obj-merged
合并一个或多个js json对象

### 安装
```
  npm install obj-merged --save
```
### 使用
```javascript
var merged = require('obj-merged');
var data1 = {
    name: '狼族小狈',
    age: 18,
    sex: '男',
    chlid: {
        name: '小狼',
        sex: '男'
    }
}
var data2 = {
    name: '珍果',
    sex: '女',
    chlid: {
        name: '小果',
        age: 5
    }
}
var newObj = merged(data1, data2, { msg: '不限参数个数，后面的会覆盖前面的对应属性值' });
console.log(newObj);
/*
    
    输出：
    { 
        name: '珍果',
        age: 18,
        sex: '女',
        chlid: { name: '小果', sex: '男', age: 5 },
        msg: '不限参数个数，后面的会覆盖前面的对应属性值' 
    }
*/

```
