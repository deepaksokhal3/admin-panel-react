import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import ProductsTable        from '../ProductsTable';
import MapContainer         from '../map/MapContainer';
import UserMarker           from '../userMarker.png';
import ClientInformation    from './ClientInformation';


class ModalBody extends Component {
    static propTypes = {
        data             : PropTypes.object.isRequired,
        onCloseModal     : PropTypes.func.isRequired,
        prefetchOneOrder : PropTypes.func.isRequired,
        cancelOrder      : PropTypes.func.isRequired,
        orderStatus      : PropTypes.object,
        currentPage      : PropTypes.number.isRequired,
        params           : PropTypes.object.isRequired
    }

    static defaultProps = {
        orderStatus : {}
    };

    prepareMapsData(data) {
        const { client, id, coordinates } = data;
        const { secondName, phone } = client;
        const cleanCoordinates = this.prepareCoordinates(coordinates);
        let driverName = 'Пользователь';

        if (Object.keys(client).length) {
            driverName = secondName ? secondName : phone;
        }

        const result = {
            id,
            coordinates : cleanCoordinates,
            driverName
        };

        return [ result ];
    }

    prepareTotalPrice = (price) => {
        return price / 100;
    }

    prepareCoordinates = data => {
        if (!data) return {};

        return {
            lat : data[0],
            lng : data[1]
        };
    }

    render() {
        const { data } = this.props;
        const currency = switchCurrency(localStorage.providerCurrency);

        return (
            <div>
                <div className = 'userInfirmation__midle-wrapper'>
                    <ClientInformation
                        data = {data}
                        {...this.props}
                        status =  {this.props.orderStatus}
                        currentPage = {this.props.currentPage}
                        params = {this.props.params}
                        onCloseModal = {this.props.onCloseModal}
                    />
                    <div className = 'userInformation__map'>
                        <MapContainer
                            isDrivers = {false}
                            customData = {this.prepareMapsData(data)}
                            isLogo = {false}
                            defaultCenter = {this.prepareCoordinates(data.coordinates)}
                            MarkerIcon = {UserMarker}
                        />
                    </div>
                </div>
                <ProductsTable data = {data} isOrder />
                <div className = 'userInformation__totalPrice'>Итого: {`${this.prepareTotalPrice(data.price)  } ${   currency}`}</div>
            </div>
        );
    }
}

function switchCurrency(currency) {
    let retValue;

    switch (currency) {
        case 'UAH':
            retValue = 'грн.';
            break;
        case 'BYN':
            retValue = 'руб.';
            break;
        case 'RUB':
            retValue = 'руб.';
            break;
        case 'KZT':
            retValue = 'тңг.';
            break;
        default:
            break;
    }

    return retValue;
}

export default  ModalBody;
