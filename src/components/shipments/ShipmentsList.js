import React, { Component }   from 'react';
import PropTypes              from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { prefetchShipments as shipmentsActions }  from '../shipments/shipmentsAction.js';
import Modal                  from '../Modal';

import ProductsTable          from '../ProductsTable';
import ShipmentsTable         from './ShipmentsTable';

class ShipmentsList extends Component {
    static propTypes = {
        shipments         : PropTypes.array.isRequired,
        prefetchShipments : PropTypes.PropTypes.func,
        totalShipments    : PropTypes.number
    };

    static defaultProps = {
        prefetchShipments : {},
        totalShipments    : 0
    };

    state = {
        shipmentsList   : [],
        currentShipment : [],
        isOpenModal     : false
    }
    componentWillMount() {
        this.props.prefetchShipments({ page: 1, perPage: 10 }, { include: 'drivers, products, providers' });
    }

    componentWillReceiveProps(nextProps) {
        const { shipments } = nextProps;

        if (nextProps !== this.props && shipments) {
            const shipmentsList = [];

            for (const item in shipments) {
                if (item) {
                    const { id, createdAt, driver, productsLinks, productsItems, type } = shipments[item];

                    shipmentsList.push({ id, createdAt, driver, productsLinks, productsItems, type });
                }
            }

            this.setState({ shipmentsList });
        }
    }

    handleLoadMore(page) {
        this.props.prefetchShipments({ page, perPage: 10 });
    }

    handleOpenModal(currentShipment) {
        this.setState({
            isOpenModal : true,
            currentShipment
        });
    }

    handleCloseModal() {
        this.setState({
            isOpenModal : false
        });
    }


    render() {
        const { currentShipment } = this.state;
        const { totalShipments } = this.props;

        return (
            <div>
                <ShipmentsTable
                    data = {this.state.shipmentsList}
                    onLoadMore = {this.handleLoadMore.bind(this)}
                    onOpenModal = {this.handleOpenModal.bind(this)}
                    totalCountItems = {totalShipments}
                />
                <Modal
                    isOpen = {this.state.isOpenModal}
                    onClose = {this.handleCloseModal.bind(this)}
                    title = 'Информация об отгрузе'
                    type = 'INFO'
                >
                    {currentShipment ? <ProductsTable data = {currentShipment} isShipment /> : null}
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        shipments      : state.shipmentState.data,
        totalShipments : state.shipmentState.total,
        admin          : state.admin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prefetchShipments : bindActionCreators(shipmentsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentsList);
