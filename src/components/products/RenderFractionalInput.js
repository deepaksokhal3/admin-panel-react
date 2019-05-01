import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import TextField            from 'material-ui/TextField';

class CustomTextField extends Component {
    static propTypes = {
        onSetValue : PropTypes.func.isRequired,
        value      : PropTypes.number.isRequired,
        styles     : PropTypes.object,
        name       : PropTypes.string,
        hintText   : PropTypes.string,
        isDisabled : PropTypes.bool,
        error      : PropTypes.string
    }
    static defaultProps = {
        styles     : {},
        error      : '',
        name       : '',
        hintText   : '',
        isDisabled : false
    }

    state = {
        value : this.props.value
    }

    handleOnChange = (e, value) => {
        const { name } = this.props;

        if ((value.lastIndexOf('-') >= 0
            || value.lastIndexOf('+') >= 0
            || value.lastIndexOf('e') >= 0)
            || isNaN(value)
            || ((value.lastIndexOf('.') >= 0) && value.split('.').pop().length > 2)
            || value.length > 6) return;

        this.setState({ value, error: '' });

        this.props.onSetValue(name === 'cost' ? parseInt(Math.round(value * 100), 10) : parseInt(Math.round(value * 1000), 10));
    }

    render() {
        const {
            styles,
            hintText,
            isDisabled,
            name
        } = this.props;
        const { value } = this.state;
        const { error } = this.props;

        return (
            <div>
                <TextField
                    disabled = {isDisabled}
                    value = {value}
                    onChange = {this.handleOnChange}
                    style = {{ ...styles, 'width': 140 }}
                    floatingLabelText = {hintText}
                    name = {name}
                    errorText = {error}
                    errorStyle  = {{
                        position     : 'absolute',
                        bottom       : '-18px',
                        marginBottom : 10,
                        height       : 'auto',
                        width        : 'inherit'
                    }}
                />
            </div>
        );
    }
}

export default CustomTextField;
