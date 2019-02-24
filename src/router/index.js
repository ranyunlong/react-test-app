import  { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react'

import AdminIndex from '../views/sys'
import Home from '../views/Home'
import Notfound from '../views/Notfound'
import AdminLogin from "../views/sys/Login";
import { connect } from 'react-redux'
import  './App.css'
class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route exact path={'/sys/login'} component={AdminLogin} />
                        <Route path={'/sys'} render={(props) => {
                            const { admin } = this.props;
                            const { location } = props
                            if (!admin.token) {
                                return <Redirect to={'/sys/login'} />
                            } else if(location.pathname === '/sys') {
                                return <Redirect to={'/sys/welcome'} />
                            } else {
                                return <AdminIndex {...props} />
                            }
                        }} />
                        <Route component={Notfound} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect((state) => ({ admin: state.admin }))(Router)

