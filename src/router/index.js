import  { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react'

import Admin from '../views/Admin'
import Home from '../views/Home'
import Notification from '../views/Notification'

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path={'/'} component={Home}></Route>
                    <Route exact path={'/admin'} component={Admin}></Route>
                    <Route exact component={Notification} />
                </div>
            </BrowserRouter>
        )
    }
}

export default Router