import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import CircularProgress from 'material-ui/CircularProgress';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import { AppBar, Menu, Notification, defaultTheme, setSidebarVisibility as setSidebarVisibilityAction }  from 'admin-on-rest';
import Sidebar from './Sidebar';
import  styles from './styles';

const prefixedStyles = {};

class CustomLayout extends Component {
    componentWillMount() {
        if (this.props.width === 1) {
            this.props.setSidebarVisibility(true);
        }
    }

    render() {
        const {
            children,
            dashboard,
            isLoading,
            logout,
            menu,
            theme,
            title,
            width
        } = this.props;

        const muiTheme = getMuiTheme(theme);

        if (!prefixedStyles.main) {
            const prefix = autoprefixer(muiTheme);

            prefixedStyles.wrapper = prefix(styles.wrapper);
            prefixedStyles.main = prefix(styles.main);
            prefixedStyles.body = prefix(styles.body);
            prefixedStyles.bodySmall = prefix(styles.bodySmall);
            prefixedStyles.content = prefix(styles.content);
            prefixedStyles.contentSmall = prefix(styles.contentSmall);
        }

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={prefixedStyles.wrapper}>
                    <div style={prefixedStyles.main}>
                        {width !== 1 && <AppBar title={title} />}
                        <div
                            className='body'
                            style={
                                width === 1 ? (
                                    prefixedStyles.bodySmall
                                ) : (
                                    prefixedStyles.body
                                )
                            }
                        >
                            <div
                                style={
                                    width === 1 ? (
                                        prefixedStyles.contentSmall
                                    ) : (
                                        prefixedStyles.content
                                    )
                                }
                            >
                                {children}
                            </div>
                            <Sidebar theme={theme}>
                                {createElement(menu || Menu, {
                                    logout,
                                    hasDashboard : !!dashboard
                                })}
                            </Sidebar>
                        </div>
                        <Notification />
                        {isLoading && (
                            <CircularProgress
                                className='app-loader'
                                color='#fff'
                                size={width === 1 ? 20 : 30}
                                thickness={2}
                                style={styles.loader}
                            />
                        )}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
]);

CustomLayout.propTypes = {
    children  : PropTypes.oneOfType([ PropTypes.func, PropTypes.node ]),
    dashboard : componentPropType,
    isLoading : PropTypes.bool.isRequired,
    logout    : PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.string
    ]),
    menu                 : PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
    setSidebarVisibility : PropTypes.func.isRequired,
    title                : PropTypes.node.isRequired,
    theme                : PropTypes.object,
    width                : PropTypes.number
};

CustomLayout.defaultProps = {
    theme     : defaultTheme,
    width     : 1,
    menu      : '',
    children  : () => {},
    dashboard : null,
    logout    : () => {}
};

function mapStateToProps(state) {
    return {
        isLoading : state.admin.loading > 0
    };
}

const enhance = compose(
    connect(mapStateToProps, {
        setSidebarVisibility : setSidebarVisibilityAction
    }),
    withWidth()
);

export default enhance(CustomLayout);
