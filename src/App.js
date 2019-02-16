import React, { Component } from 'react';
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { connect } from 'react-redux'
import { SET_ADMIN_TOKEN } from './store/reducers/action-types'
import  Router from './router'
import './App.css';

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <div className="App">
                    <Router/>
                </div>
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
