import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Layout, Icon, Menu} from 'antd';
import { Route, Link } from 'react-router-dom';
import './index.less';
import Welcome from "./Welcome";
import User from "./User";
import http from '../../utils/http';
class SysIndex extends Component {
    state = {
        collapsed: false,
        menuList: []
    }
    componentWillMount() {
        this.getMenuList();
    }
    getMenuList() {
        http.get('/sys/menu/list').then(({data}) => {
            this.setState({
                menuList: data
            })
        })
    }
    renderMenu(parentId) {
        return this.state.menuList.filter((item) => item.parentId === parentId).map((item) => {
            if (item.type === 0) {
                return (
                    <Menu.SubMenu
                        title={
                            <span>
                                <Icon type="appstore" />
                                <span>{item.name}</span>
                            </span>
                        }
                        key={item.menuId}
                    >
                        {this.renderMenu(item.menuId)}
                    </Menu.SubMenu>
                )
            } else if(item.type === 1) {
                if (item.name === 'SQL监控') return;
                return (
                    <Menu.Item key={item.menuId}>
                        <Link to={`/${item.url}`}>{item.name}</Link>
                    </Menu.Item>
                )
            }
        })
    }
    render() {
        const { match } = this.props
        return (
            <Layout className={'page-admin'}>
                <Layout.Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={(collapsed) => { this.setState({ collapsed }) }}
                >
                    <div className={'logo'}>
                        陆向谦创新实验室
                    </div>
                    <Menu
                        theme={'dark'}
                        defaultSelectedKeys={['1']}
                        mode="inline"
                    >
                        {
                            this.renderMenu(0)
                        }
                    </Menu>
                </Layout.Sider>
                <Layout>
                    <Layout.Header className={'main-header'}>
                        <Button
                            onClick={() => { this.setState({collapsed: !this.state.collapsed}) }}
                        >
                            <Icon type={'menu'} />
                        </Button>
                    </Layout.Header>
                    <Layout.Content className={'router-view'}>
                        <Route exact path={`${match.path}/welcome`} component={Welcome} />
                        <Route exact path={`${match.path}/user`} component={User} />
                    </Layout.Content>
                </Layout>
            </Layout>
        )
    }
}

export default connect((state)=> ({
   admin: state.admin
}) )(SysIndex)