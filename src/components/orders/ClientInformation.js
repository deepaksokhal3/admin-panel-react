import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Moment               from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import { statuses }         from '../../etc/statuses.json';

import UserInformationBlock from './UserInformationBlock';
import './styles.css';
import 'moment/locale/ru';


class ClientInformation extends Component {
    static propTypes = {
        data             : PropTypes.object.isRequired,
        prefetchOneOrder : PropTypes.func.isRequired,
        cancelOrder      : PropTypes.func.isRequired,
        onCloseModal     : PropTypes.func.isRequired,
        status           : PropTypes.object,
        params           : PropTypes.object.isRequired
    }

    static defaultProps = {
        status : {}
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.status !== nextProps.status) {
            this.props.prefetchOneOrder(this.props.params);
            this.props.onCloseModal();
        }
    }

    handleOnCancelOrder = () => {
        const { data, cancelOrder } = this.props;

        cancelOrder({ id: data.id });
    }

    prepareStatusLabel = (status) => {
        return `${statuses[status] ? statuses[status].toUpperCase() : status}`;
    }

    prepareDate = value =>  value ? Moment(value).format('LLL') : '';


    renderValueLabel(value) {
        return (
            value || <span className = 'userInformation__label-notification'>Неизвестно</span>
        );
    }

    render() {
        const { data } = this.props;
        const { createdAt, deadLine, client, driver, info, status, completeTime, address } = data;

        return (
            <div className='ClientInformation'>
                <UserInformationBlock
                    title = 'Информация о клиенте:'
                    secondName = {client.secondName}
                    data= {data}
                    source = 'client'
                />
                <UserInformationBlock
                    title = 'Информация о менеджере:'
                    secondName = {driver.secondName}
                    data= {data}
                    source = 'driver'
                />
                <div className = 'userInformation__wraper' >
                    <div className = 'userInformation__title' >Информация о текущем заказе:</div>
                    <div className = 'userInformation__infoBlock'>
                        <div className = 'userInformation__infoBlock-name'> Создан: </div>
                        <div className = 'userInformation__infoBlock-value'>{this.renderValueLabel(this.prepareDate(createdAt))}</div>
                    </div>
                    <div className = 'userInformation__infoBlock'>
                        <div className = 'userInformation__infoBlock-name'> Истекает: </div>
                        <div className = 'userInformation__infoBlock-value'>{this.renderValueLabel(this.prepareDate(deadLine))}</div>
                    </div>
                    <div className = 'userInformation__infoBlock'>
                        <div className = 'userInformation__infoBlock-name'> Доставлено: </div>
                        <div className = 'userInformation__infoBlock-value'>{this.renderValueLabel(this.prepareDate(completeTime))}</div>
                    </div>
                    <div className = 'userInformation__infoBlock'>
                        <div className = 'userInformation__infoBlock-name'> Статус: </div>
                        <div className = 'userInformation__infoBlock-value'>
                            <span>{this.prepareStatusLabel(status)}</span>
                        </div>
                    </div>
                    <div className = 'userInformation__infoBlock'>
                        <div className = 'userInformation__infoBlock-name'> Адрес:</div>
                        <div className = 'userInformation__infoBlock-value'>{this.renderValueLabel(address)}</div>
                    </div>
                    <div className = 'userInformation__infoBlock'>
                        <div className = 'userInformation__infoBlock-name'> Информация:</div>
                        <div className = 'userInformation__infoBlock-value'>{this.renderValueLabel(info)}</div>
                    </div>
                    <div className = 'userInformation__infoBlock'>
                        {status !== 'CANCELLED' && status !== 'COMPLETED' ?
                            <RaisedButton
                                onClick={this.handleOnCancelOrder}
                                style = {{ height: 28 }}
                                secondary
                                label = 'Отменить'
                            />
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientInformation;
