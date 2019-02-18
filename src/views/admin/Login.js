import React, { Component } from 'react';
import {Button, Form, Input, Layout, Spin, notification} from 'antd';
import uuid from 'uuid';
import http from '../../utils/http';
import { connect } from 'react-redux';
import actions from '../../store/reducers/action-types'
import './Login.less';
class AdminLogin extends  Component{
    state = {
        uuid: uuid(),
        spinning: false,
    };
    handleLogin(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { uuid } = this.state
                http.post('/sys/login', {
                    ...values,
                    uuid
                }).then(({data}) => {
                    const { msg, code, token } = data;
                    if (code === 0) {
                        // 登陆成功后跳转页面
                        this.props.setAdminToken(token);
                        this.props.history.replace('/admin')
                    } else {
                        notification.error({
                            message: '错误',
                            description: msg
                        })
                    }
                })
            }
        });
    }

    componentWillMount() {
        const { admin, history } = this.props;
        if (admin.token) {
            return history.replace('/admin')
        }
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Layout className="page-login">
                <Layout.Content>

                </Layout.Content>
                <Layout.Sider
                    width={400}
                    theme={"light"}>
                    <Form onSubmit={this.handleLogin.bind(this)} className='login-form'>
                        <Form.Item
                            label="账号"
                        >
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        {required: true, message: '账号必须'}
                                    ]
                                })(<Input allowClear />)
                            }
                        </Form.Item>
                        <Form.Item
                            label="密码"
                        >
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {required: true, message: '密码必须'}
                                    ]
                                })(<Input type={'password'} allowClear />)
                            }
                        </Form.Item>
                        <Form.Item
                            label="验证码"
                        >
                            {
                                getFieldDecorator('captcha', {
                                    rules: [
                                        {required: true, message: '验证码必须'}
                                    ]
                                })(<Input style={{width:'150px'}} allowClear />)
                            }
                            <div className="captcha">
                                <Spin spinning={this.state.spinning}>
                                    <img
                                        alt="captcha"
                                        onLoad={() => {
                                            this.setState({
                                                spinning: false
                                            })
                                        }}
                                        onClick={() => {
                                            this.setState({
                                                uuid: uuid(),
                                                spinning: true
                                            })
                                        }}
                                        style={{height: '32px'}}
                                        src={'/proxyapi/captcha.jpg?uuid=' + this.state.uuid}
                                    />
                                </Spin>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType={'submit'} block type={'primary'}>登陆</Button>
                        </Form.Item>
                    </Form>
                </Layout.Sider>
            </Layout>
        );
    }
}

export default Form.create({
    name: 'LoginForm'
})(connect((state) => {
    return {
        admin: state.admin
    }
},(dispatch) => {
    return {
        setAdminToken(data) {
            localStorage.setItem('token', data)
            const type = actions.SET_ADMIN_TOKEN;
            dispatch({ type, data });
        }
    }
})(AdminLogin))