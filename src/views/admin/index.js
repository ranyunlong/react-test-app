import React, { Component } from 'react'
import { connect } from 'react-redux'
class AdminIndex extends Component {
    componentWillMount() {
        const { admin, history } = this.props;
        if (!admin.token) {
            history.replace('/admin/login')
        }
    }

    render() {
        return (
            <div>
                Admin
            </div>
        )
    }
}

export default connect((state)=> ({
   admin: state.admin
}) )(AdminIndex)