import React, { Component } from 'react';
import {Button, Input, notification, Pagination, Table} from 'antd';
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
        search: '',
        columns: [
            {
                title: 'id',
                dataIndex: 'userId'
            },
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '手机',
                dataIndex: 'mobile'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            },
            {
                title: '操作',
                dataIndex: 'tools'
            }
        ]
    }
    componentWillMount() {
        this.getUserList()
    }
    getUserList() {
        const { currPage, pageSize } = this.state.page
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
            console.log(page)
        })
    }
    render() {
        return (
            <div className={'page-user'}>
                <header>
                    <Input.Search style={{width: '200px'}} /> <Button type="primary">新增</Button>
                </header>
                <Table rowSelection={() => {}} rowKey='userId' size="small" pagination={false} dataSource={this.state.page.list} columns={this.state.columns}></Table>
                <footer>
                    <Button type="danger">批量删除</Button>
                    <Pagination
                        onChange={(currPage) => {
                            this.setState({
                                page: {
                                    ...this.state.page,
                                    currPage
                                }
                            }, () => {
                                this.getUserList()
                            })
                        }}
                        size="small"
                        total={this.state.page.totalCount}
                    />
                </footer>
            </div>
        )
    }
}

export default User;