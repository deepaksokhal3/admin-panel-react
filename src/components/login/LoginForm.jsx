import React, { Component }            from 'react';
import PropTypes                       from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect }                     from 'react-redux';
import compose                         from 'recompose/compose';

import MuiThemeProvider      from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme           from 'material-ui/styles/getMuiTheme';
import { Card, CardActions } from 'material-ui/Card';
import Avatar                from 'material-ui/Avatar';
import RaisedButton          from 'material-ui/RaisedButton';
import TextField             from 'material-ui/TextField';
import CircularProgress      from 'material-ui/CircularProgress';
import LockIcon              from 'material-ui/svg-icons/action/lock-outline';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {
    userLogin,
    defaultTheme,
    translate,
    Notification } from 'admin-on-rest';
import { FactoryValidation } from '../../FactoryValidation';

import styles      from './styles.js';

function getColorsFromTheme(theme) {
    if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
    const { palette: { primary1Color, accent1Color } } = theme;


    return { primary1Color, accent1Color };
}

class Login extends Component {
    static propTypes = {
        ...propTypes,
        previousRoute : PropTypes.string,
        translate     : PropTypes.func.isRequired,
        userLogin     : PropTypes.func.isRequired
    }

    static defaultProps = {
        previousRoute : ''
    }

    login = auth => {
        this.props.userLogin(
            auth,
            this.props.location.state  ? this.props.location.state.nextPathname : '/'
        );
    }

    renderInput({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) {
        return (
            <TextField
                errorText={touched && error}
                {...inputProps}
                {...props}
                fullWidth
                floatingLabelStyle= {{ transform: 'scale(0.75) translate(0px, -28px)' }}
            />
        );
    }

    render() {
        const { handleSubmit, isLoading } = this.props;
        const muiTheme = getMuiTheme(defaultTheme);
        const { primary1Color, accent1Color } = getColorsFromTheme(muiTheme);

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{ ...styles.main, backgroundColor: primary1Color }}>
                    <Card style={styles.card}>
                        <div style={styles.avatar}>
                            <Avatar
                                backgroundColor={accent1Color}
                                icon={<LockIcon />}
                                size={60}
                            />
                        </div>
                        <form onSubmit={handleSubmit(this.login)}>
                            <div style={styles.form}>
                                <div style={styles.input}>
                                    <Field
                                        name='username'
                                        component={this.renderInput}
                                        floatingLabelText={this.props.translate(
                                            'aor.auth.username'
                                        )}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div style={styles.input}>
                                    <Field
                                        name='password'
                                        component={this.renderInput}
                                        floatingLabelText={this.props.translate(
                                            'aor.auth.password'
                                        )}
                                        type='password'
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <CardActions>
                                <RaisedButton
                                    type='submit'
                                    primary
                                    disabled={isLoading}
                                    icon={
                                        isLoading && (
                                            <CircularProgress
                                                size={25}
                                                thickness={2}
                                            />
                                        )
                                    }
                                    label={this.props.translate('aor.auth.sign_in')}
                                    fullWidth
                                />
                            </CardActions>
                        </form>
                    </Card>
                    <Notification />
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return { isLoading: state.admin.loading > 0 };
}

const enhance = compose(
    translate,
    reduxForm({
        form     : 'signIn',
        validate : (values) => {
            const rules = {
                username : [ 'required', 'email' ],
                password : 'required'
            };

            return FactoryValidation(values, rules);
        }
    }),
    connect(mapStateToProps, { userLogin })
);

export default enhance(Login);
