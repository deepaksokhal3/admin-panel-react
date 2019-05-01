import React, { Component } from 'react';
import {
    List,
    Datagrid,
    DateField,
    TextField
} from 'admin-on-rest';
import PropTypes from 'prop-types';
import { connect }            from 'react-redux';
import Moment               from 'moment';
import { bindActionCreators } from 'redux';
import { saveAs }             from 'file-saver/FileSaver';
import { statuses }           from '../../etc/statuses.json';
import { DateFieldFormat, DefaultSortValue } from '../../constants';
import 'moment/locale/ru';

import Button          from '../Button';
import Modal           from '../Modal';
import PhoneField      from '../PhoneField';
import { cancelOrder, prefetchOneOrder, prefetchOrdersReportList }  from './ordersAction';
import NameField       from './NameField';
import StarRatingField from './StarRatingField';
import rowStyle        from './rowStyle';
import OrdersFilter    from './OrdersFilter';
import OrderModalBody  from './OrderModalBody';
import OrdersActionsComponent  from './OrdersActionsComponent';
import OrderReportModalBody from './OrderReportModalBody';


class OrdersList extends Component {
    static propTypes = {
        record                   : PropTypes.object,
        showNotification         : PropTypes.func,
        cancelOrder              : PropTypes.func.isRequired,
        prefetchOneOrder         : PropTypes.func.isRequired,
        prefetchOrdersReportList : PropTypes.func.isRequired,
        orderStatus              : PropTypes.object,
        ordersReportData         : PropTypes.array,
        isLoading                : PropTypes.bool,
        admin                    : PropTypes.object.isRequired
    };

    static defaultProps = {
        record           : {},
        showNotification : () => {},
        orderStatus      : {},
        ordersReportData : [],
        isLoading        : false
    }

    state = {
        isOpenModal      : false,
        isCreateReport   : false,
        currentOrder     : {},
        ordersReportData : [],
        reportError      : ''
    }

    componentWillReceiveProps(nextProps) {
        const { ordersReportData } = nextProps;
        const { isCreateReport } = this.state;

        if (ordersReportData.length && isCreateReport) {
            const result = this.convertTableDataToCSV(ordersReportData);
            const blob = new Blob([ result ], { type: 'text/csv;charset=utf-8' });

            saveAs(blob, 'file.xls');
            this.setState({
                ordersReportData,
                isCreateReport : false,
                reportError    : ''
            });
        }

        if (isCreateReport && (this.props.isLoading && !nextProps.isLoading) && !ordersReportData.length) {
            this.setState({ reportError: 'За выбраный период отчеты отсутствуют', isCreateReport: false });
        }
    }


    handleCloseModal = () => this.setState({ isOpenModal: false })

    handleOpenModal = (currentOrder) => this.setState({ isOpenModal: true, currentOrder });

    handleOpenStatModal = () => this.setState({ isOpenModal: true, currentOrder: {} })
    handleDownloadReport = async (createdAt) => {
        this.setState({
            isCreateReport : true,
            reportError    : ''
        });
        await this.props.prefetchOrdersReportList({ createdAt });
    }

    convertTableDataToCSV = (data = []) => {
        if (!data.length) return '';

        const keys   = [
            'createdAt', 'completeTime', 'status', 'address', 'client', 'driver', 'productsItems', 'productsLinks', 'price'
        ];
        const cd     = ';';
        const ld     = '\n';
        let   result = '';

        result += `${keys.map(this.formatRealToDisplay).join(cd)}${ld}`;

        result += data
            .map((row) => {
                const bottleCount =  this.checkBottle(row.productsItems, row.productsLinks, 'BOTTLE');
                const waterCount = this.checkBottle(row.productsItems, row.productsLinks);

                return keys.map(key => {
                    let value = row[key] ? row[key] : '';

                    if (typeof value === 'object' && key !== 'productsLinks' && key !== 'productsItems') {
                        value = this.prepareNestedArray(value, key);
                    }


                    if (typeof value === 'object' && key === 'productsItems') {
                        value = waterCount;
                    }

                    if (typeof value === 'object' && key === 'productsLinks') {
                        value = bottleCount;
                    }

                    if (value && (key === 'createdAt' || key === 'completeTime')) value =  Moment(value).format('LLLL');
                    if (value && key === 'price') value = value / 100;


                    return `"${value === '-' || !value ? '' : value }"`;
                }).join(cd);
            }).join(ld);

        return result;
    }

    prepareNestedArray = (value, key) => {
        if (!Object.keys(value).length) return '-';

        switch (key) {
            case 'client':
                return value.phone;
            case 'driver':
                return value.email;
            default:
                return '-';
        }
    }

    checkBottle = (productsItems, productsLinks, productType = 'BOTTLED_WATER') => {
        let counter = 0;

        for (const item in productsItems) {
            if (item) {
                const { id, type } = productsItems[item];

                if (type === productType) {
                    const count =  productsLinks.find(d => d.id === id).count;

                    counter += count;
                }
            }
        }

        return counter;
    }

    formatRealToDisplay = (name) => {
        switch (name) {
            case 'createdAt':
                return 'Время создания заказа';
            case 'completeTime':
                return 'Время выполнения заказа';
            case 'status':
                return 'Статус заказа';
            case 'address':
                return 'Адрес доставки';
            case 'price':
                return 'Итого за заказ';
            case 'client':
                return 'Телефон клиента';
            case 'driver':
                return 'E-mail водителя';
            case 'productsLinks':
                return 'Количество возвращенной тары';
            case 'productsItems':
                return 'Количество товаров';
            default:
                return `${name[0].toUpperCase()}${name.slice(1)}`;
        }
    }


    prepareStatusLabel = (status) => {
        return `${statuses[status] ? statuses[status].toUpperCase() : status}`;
    }

    render() {
        const LblName = 'resources.orders.';
        const { currentOrder } = this.state;
        const StatusField = ({ record = {} }) => <span>{this.prepareStatusLabel(record.status)}</span>;
        const isOrderInfo = !!Object.keys(currentOrder).length;

        return (
            <div>
                <List
                    title= {`${LblName}name`}
                    {...this.props}
                    filter = {{ include: 'drivers,clients,products,providers' }}
                    filters = {<OrdersFilter />}
                    sort={DefaultSortValue}
                    actions = {<OrdersActionsComponent  {...this.props} onOpenModal = {this.handleOpenStatModal} />}
                >
                    <Datagrid rowStyle={rowStyle} >
                        <DateField
                            source='createdAt'
                            label ='resources.createdAt'
                            style={{ padding: '0px 12px 0px 40px' }}
                            options={DateFieldFormat}
                            locales='ru-RU'
                        />
                        <NameField source = 'driver.secondName' isAvatar  />
                        <TextField source = 'client.firstName' label={`${LblName}clientName`}  />
                        <PhoneField
                            source = 'client'
                            label =  {`${LblName}phone`}
                            sortable={false}
                            isNested
                        />
                        <StatusField
                            source = 'status'
                            label =  {`${LblName}status`}
                        />
                        <StarRatingField />
                        <Button onClick = {this.handleOpenModal} />
                    </Datagrid>
                </List>
                <Modal
                    isOpen = {this.state.isOpenModal}
                    onClose = {this.handleCloseModal.bind(this)}
                    contentStyle={{ minWidth: '714px',     maxWidth: '1100px' }}
                    title = {isOrderInfo ? 'Информация о заказе' : 'Отчеты'}
                    type = 'INFO'
                    autoScrollBodyContent
                    autoDetectWindowHeight
                >
                    { isOrderInfo ?
                        <OrderModalBody
                            data = {currentOrder}
                            cancelOrder = {this.props.cancelOrder}
                            orderStatus= {this.props.orderStatus}
                            prefetchOneOrder = {this.props.prefetchOneOrder}
                            currentPage = {this.props.admin.list.params.page || 1}
                            params = {this.props.admin.list.params}
                            onCloseModal = {this.handleCloseModal}
                        />  :
                        <OrderReportModalBody
                            errMsg = {this.state.reportError}
                            onDownloadReport = {this.handleDownloadReport}
                            isLoading = {this.state.isCreateReport}
                        />
                    }
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        orderStatus      : state.ordersState.status,
        ordersReportData : state.ordersState.ordersReportData,
        admin            : state.admin.resources.orders,
        isLoading        : state.admin.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cancelOrder              : bindActionCreators(cancelOrder, dispatch),
        prefetchOneOrder         : bindActionCreators(prefetchOneOrder, dispatch),
        prefetchOrdersReportList : bindActionCreators(prefetchOrdersReportList, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
