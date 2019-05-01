import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import RaisedButton         from 'material-ui/RaisedButton';
import style                from './styles';

export default class Button extends Component {
    static propTypes = {
        record      : PropTypes.object,
        label       : PropTypes.string,
        onClick     : PropTypes.func,
        isDisabled  : PropTypes.bool,
        customStyle : PropTypes.object
    };

    static defaultProps = {
        onClick     : () => {},
        record      : {},
        isDisabled  : false,
        label       : 'Подробности',
        customStyle : {}
    }


    handleOnClick = () => {
        const { record, onClick } = this.props;

        onClick(record);
    }

    render() {
        const { label, isDisabled, customStyle } = this.props;
        const disabledStyle = isDisabled ? { opacity: 0.4 } : {};

        return (
            <RaisedButton
                label = {label}
                disabled = {isDisabled}
                onClick = {this.handleOnClick}
                style = {{ ...style.buttonStyle, ...customStyle, ...disabledStyle }}
                buttonStyle = {{ ...style.buttonStyle, ...customStyle }}
                overlayStyle = {{ ...style.buttonStyle, ...customStyle }}
            />
        );
    }
}
