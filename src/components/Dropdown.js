import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import SelectField from 'material-ui/SelectField';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';

class Dropdown extends Component {
    static propTypes = {
        data               : PropTypes.object,
        label              : PropTypes.string,
        onSetDropdownValue : PropTypes.func.isRequired,
        value              : PropTypes.string,
        styles             : PropTypes.object
    }
    static defaultProps = {
        data   : {},
        styles : {},
        label  : '',
        value  : ''
    }

    state = {
        dropdownValue : ''
    }

    componentWillMount() {
        const { value } = this.props;

        this.setState({
            dropdownValue : value || null
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data.length !== nextProps.data.length) this.setState({ dropdownValue: null });
    }

    handleChange = (event, index, dropdownValue) => {
        this.setState({
            dropdownValue
        });
        this.props.onSetDropdownValue(dropdownValue);
    }

    render() {
        const { data, styles, label } = this.props;
        const { dropdownValue } = this.state;

        return (
            <SelectField
                value={dropdownValue}
                maxHeight={150}
                onChange={this.handleChange}
                style = {styles}
                disabled = {!data.length}
                floatingLabelText = {label}
            >
                { data.length
                    ?  data.map(record => {
                        const { id, name, imageUrl } = record;

                        return (
                            <MenuItem
                                value={id}
                                key={id}
                                primaryText={name}
                                leftIcon={imageUrl ? <Avatar src={imageUrl} /> : null}
                            />
                        );
                    }
                    ) : (<MenuItem value={null} primaryText= '' />)
                }
            </SelectField>
        );
    }
}

export default Dropdown;
