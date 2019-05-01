import React, { Component } from 'react';
import {
    TextField,
    List,
    Datagrid,
    EditButton,
    DateField
} from 'admin-on-rest';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as shipmentsActions  from '../shipments/shipmentsAction.js';
import { prefetchProviders }  from '../providers/providersActions.js';
import { setCoins }           from '../coins/coinActions';
import IconButton             from '../IconButton';
import CreateShipmentForm     from '../shipments/CreateShipmentForm';
import Modal                  from '../Modal';
import {
    DateFieldFormat,
    DefaultSortValue }        from '../../constants.js';
import PhoneField             from '../PhoneField';

import FullNameField          from '../FullNameField';
import SetCoinForm            from '../coins/SetCoinForm.js';
import SocialBlock            from '../SocialBlock';
import { prefetchUser }       from './usersActions';
import styles                 from './styles';
import UsersFilter            from './UsersFilter.js';


class UsersList extends Component {
    static propTypes = {
        shipmentsActions  : PropTypes.object.isRequired,
        prefetchProviders : PropTypes.func.isRequired,
        setCoins          : PropTypes.func.isRequired,
        isLoading         : PropTypes.func.isRequired,
        prefetchUser      : PropTypes.func.isRequired,
        setCoinStatus     : PropTypes.bool,
        record            : PropTypes.object,
        admin             : PropTypes.object,
        shipmentState     : PropTypes.array,
        coins             : PropTypes.number,
        showNotification  : PropTypes.func
    };

    static defaultProps = {
        shipmentState    : [],
        record           : {},
        admin            : {},
        setCoinStatus    : false,
        coins            : 0,
        showNotification : () => {}
    }

    state = {
        open          : false,
        shipmentsList : [],
        isShipment    : true
    }

    componentWillMount() {
        this.props.shipmentsActions.prefetchProducts();
        this.props.prefetchProviders();
    }

    componentWillReceiveProps(nextProps) {
        const { isLoading, coins } = this.props;
        const { userId } = this.state;

        if (this.props !== nextProps) {
            const isClose =  (isLoading && !nextProps.isLoading && nextProps.shipmentState.createShipmentStatus)
                            || (isLoading && !nextProps.isLoading &&  nextProps.setCoinStatus);

            if (isClose) this.handleCloseModal();
            if (coins !== nextProps.coins && userId) {
                this.props.prefetchUser(userId);
                this.props.prefetchProviders();
                this.setState({
                    absoluteCoin : 0
                });
            }
        }
    }

    handleCloseModal = () => this.setState({ open: false, shipmentsList: [] })

    handleOpenModal = (id, name, coins) => this.setState({ open: true, userId: id, isShipment: name === 'shipment' ? true : null, driverCoins: coins })

    handleSubmit = () => {
        const { userId, shipmentsList, isShipment, absoluteCoin, shipmentType } = this.state;

        if (this.props.isLoading) return;

        if (isShipment && shipmentsList.length) {
            this.props.shipmentsActions.createShipment(userId, shipmentsList, shipmentType);
        }

        if (!isShipment && absoluteCoin && absoluteCoin !== 0) this.props.setCoins({ userId, coins: absoluteCoin });
    }

    handleChangeShipmentsData = (data, _, __, shipmentType) => {
        this.setState({
            shipmentsList : data,
            shipmentType
        });
    }

    handleChangeCoins = (absoluteCoin) => {
        this.setState({ absoluteCoin });
    }

    render() {
        const { textInput } = styles.usersList;
        const LblName = 'resources.drivers.fields.';
        const { shipmentState, coins, isLoading } = this.props;
        const { isShipment, absoluteCoin, shipmentsList, driverCoins } = this.state;

        return (
            <div>
                <List
                    title= 'resources.drivers.name'
                    {...this.props}
                    filter = {{ role: 'DRIVER' }}
                    filters={<UsersFilter />}
                    sort={DefaultSortValue}
                >
                    <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                        <FullNameField  />
                        <PhoneField
                            source = 'phone'
                            label =  {`${LblName}phone`}
                            style =  {textInput}
                            sortable={false}
                        />
                        <TextField
                            source = 'status'
                            label =  {`${LblName}status`}
                            style =  {textInput}
                            sortable={false}
                        />
                        <DateField
                            source='createdAt'
                            label ='resources.createdAt'
                            style =  {textInput}
                            options={DateFieldFormat}
                            locales='ru-RU'
                        />
                        <TextField
                            source = 'coins'
                            label = {`${LblName}balance`}
                            style = {textInput}
                        />
                        <SocialBlock />
                        <IconButton
                            onOpenModal = {this.handleOpenModal}
                        />
                        <IconButton
                            onOpenModal = {this.handleOpenModal}
                            name = 'coin'
                        />
                        <EditButton label = '' />
                    </Datagrid>
                </List>
                <Modal
                    isOpen = {this.state.open}
                    onClose = {this.handleCloseModal}
                    title = {isShipment ? 'Добавить загрузку по менеджеру' : 'Управление балансом поездок'}
                    onSubmit = {this.handleSubmit}
                    isDisabledSubmit = {
                        isLoading ||
                        isShipment ? !shipmentsList.length : !(absoluteCoin && absoluteCoin !== 0)
                    }
                >
                    {isShipment ?
                        <CreateShipmentForm
                            productsList = {shipmentState.products}
                            onChangeShipmentsData = {this.handleChangeShipmentsData}
                            isShipment
                            maxHeightList = {142}
                        />
                        :
                        <SetCoinForm
                            providerCoins = {coins}
                            driverCoins = {driverCoins}
                            onChangeCoins = {this.handleChangeCoins}
                        />
                    }
                </Modal>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        shipmentsActions  : bindActionCreators(shipmentsActions, dispatch),
        prefetchProviders : bindActionCreators(prefetchProviders, dispatch),
        prefetchUser      : bindActionCreators(prefetchUser, dispatch),
        setCoins          : bindActionCreators(setCoins, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        shipmentState : state.shipmentState,
        admin         : state.admin,
        isLoading     : !!state.admin.loading,
        coins         : state.providersState.coins,
        setCoinStatus : !!state.coinState.setCoinStatus
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
