import React, { Component } from 'react';
import {
    TextField,
    List,
    Datagrid,
    EditButton,
    DateField,
    Responsive,
    SimpleList
} from 'admin-on-rest';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes              from 'prop-types';

import {
    DateFieldFormat,
    DefaultSortValue }         from '../../constants.js';
import { createProviderAdmin } from '../users/usersActions';
import { FactoryValidation }   from '../../FactoryValidation';
import { rulesForAdmin }       from '../ValidationRules';
import IconButton              from '../IconButton';
import SetCoinForm             from '../coins/SetCoinForm.js';
import { setCoins }            from '../coins/coinActions';


import PhoneField              from '../PhoneField';
import Modal                   from '../Modal';
import AdminCreateForm         from '../providerAdmin/AdminCreateForm';
import AddAdmin                from '../providerAdmin/AddAdmin';
import { prefetchProvider }    from './providersActions';
import styles                  from './styles';
import ProvidersFilter         from './ProvidersFilter';
import LogoField               from './LogoField';
import './style.css';


class ProvidersList extends Component {
    static propTypes = {
        createProviderAdmin : PropTypes.func.isRequired,
        prefetchProvider    : PropTypes.func.isRequired,
        isLoading           : PropTypes.func.isRequired,
        setCoins            : PropTypes.func.isRequired,
        isCreated           : PropTypes.bool,
        setCoinStatus       : PropTypes.bool,
        coins               : PropTypes.number
    };

    static defaultProps = {
        isCreated     : false,
        setCoinStatus : false,
        coins         : 0
    }

    state = {
        open         : false,
        providerId   : '',
        adminData    : {},
        errors       : {},
        absoluteCoin : 0,
        isCoins      : false
    }

    componentWillReceiveProps(nextProps) {
        const { isCreated, isLoading, coins } = this.props;
        const { providerId, isCoins } = this.state;

        if (isCreated !== nextProps.isCreated && nextProps.isCreated) {
            this.handleCloseModal();
        }

        const isClose =  (isLoading && !nextProps.isLoading &&  nextProps.setCoinStatus && isCoins);

        if (isClose) this.handleCloseModal();
        this.setState({
            absoluteCoin : 0
        });
        if (coins !== nextProps.coins && providerId) this.props.prefetchProvider(providerId);
    }

    handleOpenModal = (id, name, coins) => this.setState({ open: true, isCoins: name === 'coin' ? true : null, providerId: id, driverCoins: coins })
    handleCloseModal = () => this.setState({ open: false, adminData: {}, errors: {} })
    handleChangeData = (adminData) => this.setState({ adminData, errors: {} })
    handleSubmit = () => {
        const { providerId, adminData, absoluteCoin, isCoins } = this.state;

        if (absoluteCoin && absoluteCoin !== 0) this.props.setCoins({ userId: providerId, coins: absoluteCoin });

        if (!isCoins && adminData) {
            const errors = FactoryValidation(adminData, rulesForAdmin);

            if (errors) {
                this.setState({
                    errors
                });

                return;
            }

            this.props.createProviderAdmin(providerId, adminData);
        }
    }

    handleChangeCoins = (absoluteCoin) => {
        this.setState({ absoluteCoin });
    }

    render() {
        const { textInput, largeTextInput } = styles;
        const LblName = 'resources.provider.';
        const { absoluteCoin, driverCoins, isCoins } = this.state;
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //eslint-disable-line
        const maxWidth = width < 1350 ? '10em' : '16em';

        return (
            <div>
                <List
                    title= 'resources.provider.page.list'
                    {...this.props}
                    filter = {{ role: 'PROVIDER', include: 'providers' }}
                    filters={<ProvidersFilter />}
                    sort={DefaultSortValue}
                >
                    <Responsive
                        small = {
                            <SimpleList
                                primaryText ={record => record.name} //eslint-disable-line
                                secondaryText = {record => `${record.phone} views`} //eslint-disable-line
                                tertiaryText = {record => new Date(record.createdAt).toLocaleDateString()} //eslint-disable-line
                            />
                        }
                        medium={
                            <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }} rowColumn = {{ className: 'ProviderListMedium' }} >
                                <PhoneField
                                    source = 'phone'
                                    label =  {`${LblName}phone`}
                                    style =  {{ ...textInput, ...largeTextInput }}
                                    sortable={false}
                                />
                                <TextField
                                    source = 'name'
                                    label =  {`${LblName}name`}
                                    style =  {{ ...textInput, ...largeTextInput }}
                                    sortable={false}
                                />
                                <TextField
                                    source = 'coins'
                                    label =  {`${LblName}coins`}
                                    style =  {{ ...textInput, ...largeTextInput }}
                                    sortable={false}
                                />
                                <AddAdmin
                                    onOpenModal = {this.handleOpenModal}
                                    style = {largeTextInput}
                                    {...this.props}
                                />
                                <IconButton
                                    onOpenModal = {this.handleOpenModal}
                                    name = 'coin'
                                    {...this.props}
                                />
                                <EditButton label='' />
                            </Datagrid>
                        }
                        large = {
                            <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                                <LogoField />

                                <PhoneField
                                    source = 'phone'
                                    label =  {`${LblName}phone`}
                                    style =  {textInput}
                                    sortable={false}
                                />
                                <TextField
                                    source = 'name'
                                    label =  {`${LblName}name`}
                                    style =  {{ ...textInput, maxWidth }}
                                    sortable={false}
                                />
                                <TextField
                                    source = 'address'
                                    label = {`${LblName}address`}
                                    style =  {textInput}
                                    sortable={false}
                                />
                                <TextField
                                    source = 'coins'
                                    label =  {`${LblName}coins`}
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
                                <AddAdmin
                                    onOpenModal = {this.handleOpenModal}
                                    {...this.props}
                                />
                                <IconButton
                                    onOpenModal = {this.handleOpenModal}
                                    name = 'coin'
                                    {...this.props}
                                />
                                <EditButton label='' />
                            </Datagrid>
                        }
                    />
                </List>
                <Modal
                    isOpen = {this.state.open}
                    onClose = {this.handleCloseModal}
                    title = {!isCoins ? 'Создать администратора' : 'Управление балансом поездок'}
                    onSubmit = {this.handleSubmit}
                    isDisabledSubmit = {(isCoins && !(absoluteCoin && absoluteCoin !== 0))}
                >
                    {!isCoins ?
                        <AdminCreateForm onChangeData = {this.handleChangeData} errors  = {this.state.errors} />
                        :
                        <SetCoinForm
                            isAdmin
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
        createProviderAdmin : bindActionCreators(createProviderAdmin, dispatch),
        setCoins            : bindActionCreators(setCoins, dispatch),
        prefetchProvider    : bindActionCreators(prefetchProvider, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        isCreated     : !!state.usersState.status,
        isLoading     : !!state.admin.loading,
        coins         : state.providersState.coins,
        setCoinStatus : !!state.coinState.setCoinStatus
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProvidersList);
