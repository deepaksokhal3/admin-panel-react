import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import TextField            from 'material-ui/TextField';
import IconButton           from 'material-ui/IconButton';
import IncrementIco         from 'material-ui/svg-icons/content/add';
import DecrementIco         from 'material-ui/svg-icons/content/remove';
import './style.css';

class Counter extends Component {
    static propTypes = {
        onSetCounterValue : PropTypes.func.isRequired,
        styles            : PropTypes.object,
        maxVal            : PropTypes.number,
        minVal            : PropTypes.number,
        value             : PropTypes.number
    }
    static defaultProps = {
        styles : {},
        maxVal : 50000,
        minVal : -50000,
        value  : ''
    }

    state = {
        value   : this.props.value,
        timerId : ''
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) this.setState({ value: nextProps.value });
    }

    handleOnChange = (e, value) => {
        const { maxVal, minVal } = this.props;

        if (value.lastIndexOf('e') >= 0 || value > maxVal || value < minVal || value.lastIndexOf('.') >= 0) return;

        const cleanValue = +value;

        this.setState({ value: +cleanValue });
        this.props.onSetCounterValue(+cleanValue);
    }

    handleIncrementCount = () => {
        const newValue = +this.state.value + 1;

        if (newValue > this.props.maxVal) return;
        this.setState({ value: newValue });
        this.props.onSetCounterValue(newValue);
    }
    handleDecrementCount = () => {
        const newValue = +this.state.value - 1;

        if (newValue < this.props.minVal) return;
        this.setState({ value: newValue });
        this.props.onSetCounterValue(newValue);
    }
    handleUpCount = () => {
        const timerId = setInterval(() => this.handleIncrementCount(), 500);

        this.setState({ timerId });
    }

    handleDownCount = () => {
        const timerId = setInterval(() => this.handleDecrementCount(), 500);

        this.setState({ timerId });
    }

    handleOnMousDown = () => {
        const { timerId } = this.state;

        clearInterval(timerId);
    }

    render() {
        const { styles } = this.props;
        const { value } = this.state;

        return (
            <div className = 'CounterWrapper'>
                <IconButton
                    onClick = {this.handleDecrementCount}
                    // onMouseDown = {this.handleDownCount}
                    // onMouseUp = {this.handleOnMousDown}
                >
                    <div className='Counter__button-circle'>
                        <DecrementIco />
                    </div>
                </IconButton>
                <TextField
                    value = {value}
                    onChange = {this.handleOnChange}
                    style = {styles}
                    type = 'number'
                    inputStyle = {{ textAlign: 'center' }}
                />
                <IconButton
                    onClick = {this.handleIncrementCount}
                    // onMouseDown = {this.handleUpCount}
                    // onMouseUp = {this.handleOnMousDown}
                >
                    <div className='Counter__button-circle'>
                        <IncrementIco />
                    </div>
                </IconButton>
            </div>
        );
    }
}

export default Counter;
