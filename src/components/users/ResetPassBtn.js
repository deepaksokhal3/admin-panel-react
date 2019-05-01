import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomTextField from '../CustomTextField';
import * as resetPassActions  from '../confirm-password/resetPassActions';
import * as usersActions  from './usersActions.js';


class ResetPasswordBtn extends Component {
    static propTypes = {
        usersActions     : PropTypes.object.isRequired,
        record           : PropTypes.object,
        resetPassword    : PropTypes.func,
        resetPassActions : PropTypes.func.isRequired,
        isAction         : PropTypes.bool,
        isDisabled       : PropTypes.bool,
        isResetAdmin     : PropTypes.bool,
        label            : PropTypes.string
    };

    static defaultProps = {
        resetPassword : () => {},
        record        : {},
        isDisabled    : false,
        isAction      : false,
        isResetAdmin  : false,
        label         : 'Изменить пароль'
    }

    state = {
        password : '',
        Disable  : false
    }


    handleResetPassword = () => {
        const { record, isAction, isResetAdmin } = this.props;
        const  { password } = this.state;

        if (isAction && !isResetAdmin) {
            this.props.resetPassword(record.confirmPassword, record.password);
        } else if (isResetAdmin) {
            this.props.resetPassActions.resetPassword({ email: record.email });
        } else {
            this.props.usersActions.resetPassword(record.email, password);
        }
        this.setState({ Disable: true });
    }

    handleChange = (e, value) => {
        this.setState({
            password : value
        });
    }

    render() {
        const { isDisabled, label, isAction } = this.props;
        const { password, Disable } = this.state;

        return !isAction ? (
            <div className = 'ResetPassBlock'>
                <CustomTextField
                    hintText='Пароль'
                    type='password'
                    name = 'password'
                    value = {password}
                    onSetValue = {this.handleChange}
                />
                <RaisedButton
                    label = {label}
                    backgroundColor='lightsteelblue'
                    disabled = {!password}
                    onClick={this.handleResetPassword}
                />
            </div>
        ) : (
            <RaisedButton
                label = {label}
                backgroundColor='lightsteelblue'
                disabled = {isDisabled || Disable}
                onClick={this.handleResetPassword}
            />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        usersActions     : bindActionCreators(usersActions, dispatch),
        resetPassActions : bindActionCreators(resetPassActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(ResetPasswordBtn);
