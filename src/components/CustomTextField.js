import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import TextField            from 'material-ui/TextField';

class CustomTextField extends Component {
    static propTypes = {
        onSetValue        : PropTypes.func.isRequired,
        type              : PropTypes.string,
        styles            : PropTypes.object,
        name              : PropTypes.string,
        hintText          : PropTypes.string,
        floatingLabelText : PropTypes.string,
        isDisabled        : PropTypes.bool,
        error             : PropTypes.string
    }
    static defaultProps = {
        type              : 'text',
        styles            : {},
        error             : '',
        name              : '',
        hintText          : '',
        floatingLabelText : '',
        isDisabled        : false
    }

    state = {
        value : '',
        error : ''
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.error !== nextProps.error) this.setState({ error: nextProps.error });
    }

    handleOnChange = (e, value) => {
        const { name } = this.props;

        if (value.length > 250) {
            this.setState({
                error : 'Превышен лимит символов.'
            });

            return;
        }

        this.setState({
            value,
            error : ''
        });
        this.props.onSetValue(name, value);
    }

    render() {
        const {
            styles,
            type,
            hintText,
            isDisabled,
            floatingLabelText,
            name
        } = this.props;
        const { error, value } = this.state;

        return (
            <div>
                <TextField
                    disabled = {isDisabled}
                    value = {value}
                    onChange = {this.handleOnChange}
                    type = {type}
                    style = {styles}
                    min = {0}
                    floatingLabelText = {floatingLabelText || hintText}
                    hintText = {hintText}
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
