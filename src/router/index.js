import  { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react'

import AdminIndex from '../views/admin'
import Home from '../views/Home'
import Notfound from '../views/Notfound'
import AdminLogin from "../views/admin/Login";
import  './App.css'
class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route exact path={'/admin'} component={AdminIndex} />
                        <Route exact path={'/admin/login'} component={AdminLogin} />
                        <Route component={Notfound} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router