import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { setSidebarVisibility as setSidebarVisibilityAction } from 'admin-on-rest';

function getWidth(width) {
    return typeof width === 'number' ? `${width}px` : width;
}

function getStyles({ drawer }) {
    const width = drawer && drawer.width ? getWidth(drawer.width) : '16em';

    return {
        sidebarOpen : {
            flex       : `0 0 ${width}`,
            marginLeft : 0,
            order      : -1,
            transition : 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
        },
        sidebarClosed : {
            flex       : `0 0 ${width}`,
            marginLeft : `-${width}`,
            order      : -1,
            transition : 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
        }
    };
}

class Sidebar extends PureComponent {
    handleClose = () => {
        this.props.setSidebarVisibility(false);
    };

    render() {
        const { open, setSidebarVisibility, children, muiTheme } = this.props;
        const styles = getStyles(muiTheme);
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //eslint-disable-line

        return (
            width < 1350 ? (
                <Drawer
                    docked={false}
                    open={open}
                    onRequestChange={setSidebarVisibility}
                >
                    {React.cloneElement(children, {
                        onMenuTap : this.handleClose
                    })}
                </Drawer>
            ) : (
                <Paper
                    style={open ? styles.sidebarOpen : styles.sidebarClosed}
                >
                    {React.cloneElement(children, {
                        onMenuTap : () => null
                    })}
                </Paper>)
        );
    }
}

Sidebar.propTypes = {
    children             : PropTypes.node.isRequired,
    muiTheme             : PropTypes.object.isRequired,
    open                 : PropTypes.bool.isRequired,
    setSidebarVisibility : PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
    return ({
        open   : state.admin.ui.sidebarOpen,
        locale : state.locale,
        theme  : props.theme
    });
}

export default compose(
    muiThemeable(),
    connect(mapStateToProps, {
        setSidebarVisibility : setSidebarVisibilityAction
    })
)(Sidebar);
