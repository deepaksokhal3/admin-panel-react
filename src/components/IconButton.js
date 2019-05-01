import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import CoinIco       from 'material-ui/svg-icons/maps/local-atm';
import AddShipmentIco from 'material-ui/svg-icons/action/add-shopping-cart';

export default class AddShipment extends Component {
    static propTypes = {
        record      : PropTypes.object,
        onOpenModal : PropTypes.func,
        name        : PropTypes.string,
        label       : PropTypes.string
    };

    static defaultProps = {
        onOpenModal : () => {},
        record      : {},
        name        : 'shipment',
        label       : ''
    }

    handleOpenModal = () => {
        const { record, onOpenModal, name } = this.props;

        onOpenModal(record.id, name, record.coins);
    }

    render() {
        const { record, name, label } = this.props;

        return (
            <IconButton
                onClick={this.handleOpenModal}
                disabled = {(name !== 'coin' && record.status && !(record.status === 'ACTIVE'))}
                tooltip = {label}
                tooltipPosition = 'top-right'
            >
                { name === 'coin' ? <CoinIco color='#00bcd4' /> : <AddShipmentIco color='#00bcd4' />}
            </IconButton>
        );
    }
}

