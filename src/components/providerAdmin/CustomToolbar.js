import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }            from 'react-redux';
import { SaveButton, Toolbar }  from 'admin-on-rest';
import ResetPassword from '../users/ResetPassBtn';

class CustomToolbar extends Component {
    static propTypes = {
        form : PropTypes.string.isRequired
    }

    render() {
        const { form } = this.props;
        const email = form['record-form'].values.email;
        const status = form['record-form'].values.status;

        return (
            <Toolbar {...this.props} >
                <SaveButton label='сохранить' redirect='list' submitOnEnter />
                <ResetPassword
                    isResetAdmin
                    isAction
                    isDisabled = {status !== 'ACTIVE'}
                    record = {{ email }}
                    label = 'Сбросить пароль'
                />
            </Toolbar>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         ordersAction : bindActionCreators(ordersAction, dispatch)
//     };
// }

function mapStateToProps(state) {
    return {
        form : state.form
    };
}

export default connect(mapStateToProps, null)(CustomToolbar);
