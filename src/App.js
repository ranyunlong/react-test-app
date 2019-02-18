import React, { Component } from 'react';
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { connect } from 'react-redux'
import { SET_ADMIN_TOKEN } from './store/reducers/action-types'
import  Router from './router'

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <Router/>
            </LocaleProvider>
        );
    }
}

export default connect((state) => {
    return {
        admin: state.admin
    }
}, (dispatch) => {
    return {
        changeToken(token) {
            dispatch({
                type: SET_ADMIN_TOKEN,
                data: token
            })
        }
    }
})(App);
