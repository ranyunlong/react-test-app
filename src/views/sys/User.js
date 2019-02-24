import React, { Component } from 'react';
import {Button, Form, Input, Modal, notification, Pagination, Switch, Table} from 'antd';
import  './user.less'
import http from "../../utils/http";


class User extends Component {
    state = {
        page: {
            pageSize: 10,
            totalPage: 1,
            currPage: 1,
            totalCount: 1,
            list: []
        },
        modalTitle: '新增管理员',
        modalIsVisible: false,
        search: '',
        loading: false,
        columns: [
            {
                title: 'id',
                sorter: (a, b) => {
                    return a.userId - b.userId
                },
                dataIndex: 'userId'
            },
            {
                title: '用户名',
                align: 'center',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                align: 'center',
                dataIndex: 'email'
            },
            {
                title: '手机',
                align: 'center',
                dataIndex: 'mobile'
            },
            {
                title: '状态',
                align: 'center',
                dataIndex: 'status'
            },
            {
                title: '创建时间',
                align: 'center',
                sorter: (a, b) => {
                    return new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
                },
                dataIndex: 'createTime'
            },
            {
                title: '操作',
                align: 'center',
                dataIndex: 'tools',
                render: (tags, data) => {
                    return (
                        <span className="tools">
                            <Button
                                size="small"
                                type="primary"
                                onClick={() => {
                                    // setFieldsInitialValue
                                    const { password, ...args } = data
                                    this.props.form.setFieldsValue(args)
                                    this.setState({
                                        modalTitle: '修改管理员',
                                        modalIsVisible: true
                                    })
                                }}
                            >
                                修改
                            </Button>
                            <Button
                                style={{marginLeft: '7px'}}
                                size="small"
                                type="danger"
                                onClick={() => {
                                    Modal.confirm({
                                        title: '提示',
                                        content: `您正在删除管理员${data.username}，确认删除吗?`,
                                        onOk: () => {
                                            http.post('/sys/user/delete', [data.userId]).then(({data}) => {
                                                const { code, msg } = data
                                                if (code === 0) {
                                                    notification.success({
                                                        message: '成功',
                                                        description: '删除成功'
                                                    })
                                                    this.getUserList()
                                                } else {
                                                    notification.error({
                                                        message: '失败',
                                                        description: msg
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }}
                            >
                                删除
                            </Button>
                        </span>
                    )
                }
            }
        ],
        selectedRowKeys: []
    }
    componentWillMount() {
        this.getUserList()
    }
    getUserList() {
        const { currPage, pageSize } = this.state.page
        this.setState({loading: true})
        http.get('/sys/user/list', {
            params: {
                page: currPage,
                limit: pageSize,
                sidx: 'userId',
                order: 'desc',
                username: this.state.search,
            }
        }).then(({data}) => {
            const { msg, code, page } = data
            if (code === 0) {
                this.setState({page})
            } else {
                notification.error({
                    message: '错误',
                    description: msg
                })
            }
            this.setState({
                loading: false
            })
            // console.log(page)
        })
    }
    onSelectChange(selectedRowKeys) {
        this.setState({selectedRowKeys})
    }
    onModalCancel() {
        this.setState({
            modalIsVisible: false
        })
        this.props.form.resetFields()
    }
    onModalOk() {
        const { modalTitle } = this.state
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (err) return;
            if (values.status) {
                values.status = 1
            } else {
                values.status = 0
            }
            if (modalTitle === '新增管理员') {
                http.post('/sys/user/save', {
                    ...values,
                    userId: 0,
                    roleIdList: [0]
                }).then(({data}) => {
                    const { code, msg }= data
                    if (code === 0) {
                        notification.success({
                            message: '成功',
                            description: '添加成功'
                        })
                        this.getUserList()
                    } else {
                        notification.error({
                            message: '失败',
                            description: msg
                        })
                    }
                    this.setState({
                        modalIsVisible: false,
                    })
                    this.props.form.resetFields()
                })
            } else if (modalTitle === '修改管理员') {
                http.post('/sys/user/update', {
                    ...values,
                    roleIdList: [0]
                }).then(({data}) => {
                    const { code, msg }= data
                    if (code === 0) {
                        notification.success({
                            message: '成功',
                            description: '修改成功'
                        })
                        this.getUserList()
                    } else {
                        notification.error({
                            message: '失败',
                            description: msg
                        })
                    }
                    this.setState({
                        modalIsVisible: false,
                    })
                    this.props.form.resetFields()
                })
            }
        })
    }
    render() {
        const { selectedRowKeys, page, columns, loading, modalTitle, modalIsVisible } = this.state
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            }
        }
        const { getFieldDecorator } = this.props.form
        return (
            <div className="page-user">
                <header>
                    <Input.Search
                        onSearch={(search) => {
                            this.setState({search}, () => {
                                this.getUserList()
                            })
                        }}
                        allowClear={true}
                        style={{width: '200px'}}
                    />

                    <Button
                        style={{marginLeft: '10px'}}
                        type="primary"
                        onClick={() => {
                            this.setState({
                                modalTitle: '新增管理员',
                                modalIsVisible: true
                            })
                        }}
                    >
                        新增
                    </Button>
                </header>
                <Table
                    rowSelection={{ selectedRowKeys, onChange: this.onSelectChange.bind(this) }}
                    rowKey='userId'
                    size="small"
                    pagination={false}
                    dataSource={page.list}
                    columns={columns}
                    loading={loading}
                />
                <footer>
                    <Button
                        type="danger"
                        onClick={() => {
                            const { selectedRowKeys } = this.state
                            if (selectedRowKeys.length > 0) {
                                Modal.confirm({
                                    title: '提示',
                                    content: '您正在执行批量删除操作，是否继续？',
                                    onOk: () => {
                                        http.post('/sys/user/delete', selectedRowKeys).then(({data}) => {
                                            const { code, msg} = data
                                            if (code === 0) {
                                                notification.success({
                                                    message: '操作成功',
                                                    description: '批量删除操作成功'
                                                })
                                                this.getUserList()
                                            } else {
                                                notification.error({
                                                    message: '失败',
                                                    description: msg
                                                })
                                            }
                                        })
                                    }
                                })
                            } else {
                                notification.error({
                                    message: '错误',
                                    description: '请选择要删除的数据'
                                })
                            }
                        }}
                    >
                        批量删除
                    </Button>
                    <Pagination
                        onChange={(currPage) => {
                            this.setState({
                                page: {
                                    ...page,
                                    currPage
                                }
                            }, () => {
                                this.getUserList()
                            })
                        }}
                        size="small"
                        total={page.totalCount}
                    />
                </footer>
                <Modal
                    title={modalTitle}
                    visible={modalIsVisible}
                    onCancel={this.onModalCancel.bind(this)}
                    onOk={this.onModalOk.bind(this)}
                >
                    <Form
                        layout="horizontal"
                    >
                        <Form.Item>
                            {
                                getFieldDecorator('userId', {
                                    initialValue: 0
                                })(
                                    <Input style={{display: 'none'}} />
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            label="账号"
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true, message: '账号必须'
                                        }
                                    ]
                                })(<Input />)
                            }
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: this.state.modalTitle === '新增管理员', message: '密码必须'
                                        }
                                    ]
                                })(<Input type="password" placeholder="不输入新密码，则不修改密码。" />)
                            }
                        </Form.Item>
                        <Form.Item
                            label="邮箱"
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('email', {
                                    rules: [
                                        {
                                            required: true, message: '邮箱必须'
                                        }
                                    ]
                                })(<Input type="email" />)
                            }
                        </Form.Item>
                        <Form.Item
                            label="手机"
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('mobile', {
                                    rules: [
                                        {
                                            required: true, message: '手机必须'
                                        }
                                    ]
                                })(<Input />)
                            }
                        </Form.Item>
                        <Form.Item
                            label="启用状态"
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('status', {
                                    initialValue: true
                                })
                                (<Switch defaultChecked />)
                            }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Form.create({name: 'AdminMangerForm'})(User);