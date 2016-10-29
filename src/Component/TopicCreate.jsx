import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, Footer, GetData } from './common/index';

/**
 * 模块入口
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);

        /**
         * 初始化组件状态
         */
        this.state = {
            title: '',
            tab: '',
            content: '',
            accesstoken: this.props.User ? this.props.User.accesstoken : ''
        };

        this.postState = false;
        /**
         * 发表主题
         * 
         * @returns
         */
        this.rightClick = () => {
            var {state} = this;
            if (this.postState) return false;

            if (!state.tab) {
                return alert('请选择发表类型');
            } else if (state.title.length < 10) {
                return alert('标题字数10字以上');
            } else if (state.content.length < 30) {
                return alert('内容字数30字以上');
            }
            this.postState = true;
            Tool.post('/api/v1/topics', this.state, (res) => {
                if (res.success) {
                    this.context.router.push({
                        pathname: '/topic/' + res.topic_id
                    });
                } else {
                    alert('发表失败');
                    this.postState = false;
                }
            }, () => {
                alert('发表失败');
                this.postState = false;
            });

        }

        /**
         * 监听用户选择发表类型
         * 
         * @param {Object} e 事件出发的元素
         */
        this.tabInput = (e) => {
            this.state.tab = e.target.value;
        }

        /**
         * 监听用户输入标题
         * 
         * @param {Object} e //事件触发的元素
         */
        this.titleInput = (e) => {
            this.state.title = e.target.value;
        }

        /**
         * 监听用户输入内容
         * 
         * @param {Object} e //事件触发的元素
         */
        this.contentInput = (e) => {
            this.state.content = e.target.value;
        }

    }
    render() {
        var { User} = this.props;
        var headerSet = {};
        var main = null;
        if (!User) {
            main = <TipMsgSignin />
        } else {
            main = <NewTopic {...this.state} tabInput={this.tabInput} titleInput={this.titleInput} contentInput={this.contentInput} />
            headerSet = {
                rightIcon: 'fabu',
                rightClick: this.rightClick
            };
        }
        return (
            <div>
                <Header title="发表主题" {...headerSet} />
                {main}
                <Footer index="1" />
            </div>
        );
    }
    shouldComponentUpdate() {
        return false;
    }
}

Main.contextTypes = {
    router: React.PropTypes.object.isRequired
}

class NewTopic extends Component {
    render() {
        return (
            <div className="topic-create">
                <div className="item">
                    <select name="tab" defaultValue={this.props.tab} onInput={this.props.tabInput}>
                        <option value="">请选择发表类型</option>
                        <option value="share">分享</option>
                        <option value="ask">问答</option>
                        <option value="job">招聘</option>
                    </select>
                </div>
                <div className="item">
                    <input type="text" defaultValue={this.props.title} onInput={this.props.titleInput} placeholder="标题字数 10 字以上" />
                </div>
                <div className="item">
                    <textarea defaultValue={this.props.content} onInput={this.props.contentInput} placeholder="内容字数 30 字以上"></textarea>
                </div>
            </div>
        );
    }
}

export default connect((state) => { return { User: state.User } }, action('TopicCreate'))(Main); //连接redux