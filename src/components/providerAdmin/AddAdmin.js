import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';

export default class AddAdmin extends Component {
    static propTypes = {
        record      : PropTypes.object,
        onOpenModal : PropTypes.func,
        hint        : PropTypes.string
    };

    static defaultProps = {
        onOpenModal : () => {},
        hint        : '',
        record      : {}
    }

    handleOpenModal = () => {
        const { record, onOpenModal } = this.props;

        onOpenModal(record.id);
    }

    render() {
        return (
            <IconButton
                onClick={this.handleOpenModal}
                tooltip= {this.props.hint}
                tooltipPosition='bottom-center'
                style={{ overflow: 'visible' }}
            >
                <PersonAddIcon color='#00bcd4' />
            </IconButton>
        );
    }
}

