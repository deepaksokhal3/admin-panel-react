import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes              from 'prop-types';


import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider';
import Paper                  from 'material-ui/Paper';

import { Notification }       from 'admin-on-rest';
import ResetPassBtn           from '../users/ResetPassBtn';
import { FactoryValidation }      from '../../FactoryValidation';
import  { rulesForResetPassword } from '../ValidationRules';
import CustomTextField            from '../CustomTextField.js';
import { submitPassword, getAction } from './resetPassActions';
import styles                     from './styles.js';
import  './style.css';

class ConfirmForm extends Component {
    static propTypes = {
        submitPassword : PropTypes.func.isRequired,
        getAction      : PropTypes.func.isRequired,
        location       : PropTypes.string,
        action         : PropTypes.any
    };

    static defaultProps = {
        location : '',
        action   : null
    }

    state = {
        password        : '',
        confirmPassword : '',
        errors          : {}
    }

    componentWillMount() {
        const { location } = this.props;
        const serchParams = new URLSearchParams(location.search);
        const id = serchParams.get('action');
        const type = serchParams.get('type');

        this.props.getAction({ id });
        this.setState({ id, type });
    }

    handleChange = (name, value) => this.setState({ [name]: value, errors: {} })

    onSubmit = () => {
        const  { confirmPassword, password, id } = this.state;

        const errors = FactoryValidation({ confirmPassword, password, id }, rulesForResetPassword);

        if (errors) {
            this.setState({ errors });

            return;
        }

        return this.props.submitPassword({ confirmPassword, password, id });
    }

    render() {
        const { password, confirmPassword, errors, type } = this.state;
        const label = type === 'reset' ? 'Восстановление пароля' : 'Установить пароль';
        const error = 'Ссылка не действительна';

        return (
            <MuiThemeProvider>
                <div style={styles.main}>
                    <div style={styles.body}>
                        <div style={styles.content}>
                            <form>
                                <Paper zDepth={1} style = {styles.Paper} rounded={false} >
                                    {
                                        this.props.action === 'id WRONG_ID' ?
                                            <div
                                                style={{
                                                    margin     : 'auto',
                                                    textAlign  : 'center',
                                                    color      : 'red',
                                                    fontWeight : '900',
                                                    fontSize   : '19'
                                                }}
                                            >{error}
                                            </div> :
                                            <div>
                                                <span>{label}</span>
                                                <CustomTextField
                                                    hintText='Пароль'
                                                    type='password'
                                                    name = 'password'
                                                    value = {password}
                                                    styles = {styles.inputStyle}
                                                    error = {errors.password}
                                                    onSetValue = {this.handleChange}
                                                />
                                                <CustomTextField
                                                    hintText= 'Подтверждение пароля'
                                                    name = 'confirmPassword'
                                                    type='password'
                                                    value = {confirmPassword}
                                                    styles = {styles.inputStyle}
                                                    error = {errors.confirmPassword}
                                                    onSetValue = {this.handleChange}
                                                />
                                                <div className = 'resetPassForm__button-wrapper'>
                                                    <ResetPassBtn
                                                        resetPassword = {this.onSubmit}
                                                        label = 'Подтвердить'
                                                        isAction
                                                    />
                                                </div>
                                                <span className = 'resetPassForm__idError'>{errors.id}</span>
                                            </div>
                                    }
                                </Paper>
                            </form>
                        </div>
                    </div>
                    <Notification />
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitPassword : bindActionCreators(submitPassword, dispatch),
        getAction      : bindActionCreators(getAction, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        isCreated : !!state.resetPasswordState.status,
        action    : state.resetPasswordState.action
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmForm);
