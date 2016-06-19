!(function(GetNextPage) {
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        define(GetNextPage);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = GetNextPage();
    } else {
        window.GetNextPage = GetNextPage();
    }
})(function() {
    function GetNextPage(select, set) {
        this.el = getEl(select); //选择元素触发加载分页的元素
        /*
            元素在可视区位置，符合其中一个条件就会触发加载机制
        */
        this.top = set.top || 0; //元素在顶部伸出的距离才加载
        this.right = set.right || 0; //元素在右边伸出的距离才加载
        this.bottom = set.bottom || 0; //元素在底部伸出的距离才加载
        this.left = set.left || 0; //元素在左边伸出的距离才加载
        this.dataType = 'json';
        /*
            发送到服务器的相关数据
        */
        this.url = set.url || location.pathname; //发送到服务器的地址
        this.data = set.data || {}; //发送到服务器的数据
        this.pageName = set.pageName || 'page'; //分页的参数名称，用来加载完成后+1
        /*
            回调方法
        */
        this.startCall = set.start || function() {}; //开始加载时调用方法
        this.loadCall = set.load || function() {}; //加载成功时调用方法
        this.errorCall = set.error || function() {}; //开始加载时调用方法
        this.endCall = set.end || function() {}; //加载完成时调用方法

        //监听的事件列表
        this.monitorEvent = ['DOMContentLoaded', 'load', 'click', 'touchstart', 'touchend', 'haschange', 'online', 'pageshow', 'popstate', 'resize', 'storage', 'mousewheel', 'scroll'];
        /*
            存储http请求对象
        */
        this.xhr = null;
        /*
            页面初始化
        */
        this.init();
    };

    /**
     * 初始化插件
     */
    GetNextPage.prototype.init = function() {
        this.eachDOM = this.eachDOM.bind(this);
        this.readystatechange = this.readystatechange.bind(this);
        this.start();
    };

    GetNextPage.prototype.start = function() {
        //事件绑定
        var eventList = this.monitorEvent;
        for (let i = 0; i < eventList.length; i++) {
            window.addEventListener(eventList[i], this.eachDOM, false);
        }
        this.eachDOM();
    };
    /**
     * 卸载插件
     */
    GetNextPage.prototype.end = function() {
        var eventList = this.monitorEvent;
        for (let i = 0; i < eventList.length; i++) {
            window.removeEventListener(eventList[i], this.eachDOM, false);
        }

        if (this.xhr) this.xhr.removeEventListener('readystatechange', this.readystatechange, false);
    };

    /**
     * 遍历DOM查询是否符合加载条件
     */
    GetNextPage.prototype.eachDOM = function() {

        if (this.testXhrStart()) return;
        let length = this.el.length;
        for (let i = 0; i < length; i++) {
            if (this.testMeet(this.el[i]) === true) {
                this.GetNextPageData(this.el[i]);
                return;
            }

        }
    };
    /**
     * 获取下一页数据
     * @param {object} el 触发事件的元素
     */
    GetNextPage.prototype.GetNextPageData = function(el) {
        if (this.testXhrStart()) return;
        this.startCall(el);
        let url = this.getUrl();
        this.xhr = new XMLHttpRequest(); //创建http请求对象
        this.xhr.open('GET', url, true); //异步请求
        this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        this.xhr.addEventListener('readystatechange', this.readystatechange, false);
        this.xhr.send(); //发送请求

    };

    /**
     * http请求
     */
    GetNextPage.prototype.readystatechange = function() {
        let xhr = this.xhr;

        if (xhr.readyState === 4) {
            var head = xhr.getAllResponseHeaders();
            var response = xhr.responseText;
            //将服务器返回的数据，转换成json
            if (/application\/json/.test(head) || this.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }

            if (xhr.status === 200) {
                this.loadCall(response, xhr);
                if (this.data[this.pageName]) this.data[this.pageName]++;
            } else {
                this.errorCall(response, xhr.status, xhr);
            }
            this.endCall(response, xhr.status, xhr);
        }

    };
    /**
     * 获取发送请求的url，含参数
     * @returns {string} 返回拼接成的url地址
     */
    GetNextPage.prototype.getUrl = function() {
        let data = this.data;
        let aData = [];
        let url = '';
        for (let attr in data) {
            aData.push(attr + '=' + data[attr]);
        }
        url = this.url + '?' + aData.join('&') + '&' + new Date().getTime();
        return url;
    };
    /**
     * 检测元素是否在可视区
     * @param {object} el 检测的元素
     */
    GetNextPage.prototype.testMeet = function(el) {
        let bcr = el.getBoundingClientRect(); //取得元素在可视区的位置
        let mw = el.offsetWidth; //元素自身宽度
        let mh = el.offsetHeight; //元素自身的高度
        let w = window.innerWidth; //视窗的宽度
        let h = window.innerHeight; //视窗的高度
        let boolX = (!((bcr.right - this.left) <= 0 && ((bcr.left + mw) - this.left) <= 0) && !((bcr.left + this.right) >= w && (bcr.right + this.right) >= (mw + w))); //上下符合条件
        let boolY = (!((bcr.bottom - this.top) <= 0 && ((bcr.top + mh) - this.top) <= 0) && !((bcr.top + this.bottom) >= h && (bcr.bottom + this.bottom) >= (mh + h))); //上下符合条件
        if (el.width != 0 && el.height != 0 && boolX && boolY) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * 判断请求状态
     * @returns {boolean} true 禁止请求 false允许请求
     */
    GetNextPage.prototype.testXhrStart = function() {
        return Boolean((this.xhr !== null) && (this.xhr && this.xhr.readyState !== 4));
    };
    /**
     * 获取元素
     * @param   {string} select 选择器
     * @returns {Array}    返回选择的元素
     */
    function getEl(select) {
        switch (typeof select) {
            case 'string':
                return document.querySelectorAll(select);
            case 'object':
                if (Object.prototype.toString.call(select) === '[object Array]') {
                    return select;
                } else {
                    return [select];
                }
        }
    }
    return GetNextPage;
});