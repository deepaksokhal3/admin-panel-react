import React, { Component }   from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
import SearchIcon       from 'material-ui/svg-icons/action/search';
import { push as pushAction } from 'react-router-redux';

import {
    SimpleForm
} from 'admin-on-rest';
import TextField              from 'material-ui/TextField';
// import styles                          from './styles';
import Button             from '../Button';
import MapContainer       from '../map/MapContainer';
import CreateShipmentForm from '../shipments/CreateShipmentForm';
import * as nominatimActions from '../../NominatimActions';
import * as ordersAction  from './ordersAction';

class ProductCreateForm extends Component {
    static propTypes = {
        ordersAction      : PropTypes.object.isRequired,
        nominatimActions  : PropTypes.object.isRequired,
        push              : PropTypes.func,
        record            : PropTypes.object,
        admin             : PropTypes.object,
        products          : PropTypes.array,
        isLoading         : PropTypes.bool,
        showNotification  : PropTypes.func,
        status            : PropTypes.object,
        markerAddress     : PropTypes.string,
        markerCoordinates : PropTypes.object
    };

    static defaultProps = {
        products          : [],
        record            : {},
        push              : () => {},
        admin             : {},
        status            : {},
        showNotification  : () => {},
        isLoading         : false,
        markerAddress     : '',
        markerCoordinates : {}
    }

    state = {
        products            : [],
        coordinates         : [],
        info                : '',
        errorMsg            : {},
        bottleCountError    : '',
        isClearProductsList : false,
        allBottleCount      : 0,
        allProductsCount    : 0,
        bottledWaterCount   : 0
    }

    async componentWillMount() {
        await this.props.ordersAction.prefetchProducts();
    }

    async componentWillReceiveProps(nextProps) {
        const { isLoading, markerCoordinates, markerAddress, status } = this.props;

        if (isLoading && !nextProps.isLoading && nextProps.status.isCreated && status.id === nextProps.status.id) {
            this.setState({
                isClearProductsList : true,
                info                : ''
            });

            await this.props.ordersAction.clearStore();
            this.props.push('/orders');
        }

        if (markerCoordinates !== nextProps.markerCoordinates && nextProps.markerCoordinates.lat) {
            const { lat, lng } = nextProps.markerCoordinates;
            const coordinates = [ lat, lng ];

            this.setState({
                markerCoordinates : nextProps.markerCoordinates,
                errorMsg          : { address: '' },
                coordinates
            });
        }

        if (markerCoordinates !== nextProps.markerCoordinates && !Object.keys(nextProps.markerCoordinates).length) {
            this.setState({ errorMsg: { address: 'Адрес не найден, поставте маркер на карте' }, coordinates: [] });
        }

        if (markerAddress !== nextProps.markerAddress) {
            this.setState({
                address  : nextProps.markerAddress,
                errorMsg : { address: '' }
            });
        }
    }

    handleChangeShipmentsData = (data, allProductsCount, allBottleCount, shipmentType, bottledWaterCount) => {
        const bottleCountError = allBottleCount > bottledWaterCount ? 'Количество пустой тары должно быть не больше, чем количество Воды с тарой' : '';

        this.setState({
            products            : data,
            isClearProductsList : false,
            allBottleCount,
            allProductsCount,
            bottleCountError,
            bottledWaterCount
        });
    }

    handleSubmit = () => {
        const { products, info, coordinates, address } = this.state;

        if (!info) {
            this.setState({
                errorMsg : {
                    info : 'Обязательное поле'
                }
            });
        }

        if (products.length && info && coordinates) {
            this.props.ordersAction.createOrder({ products, info, coordinates, address });
        }
    }

    handleChangePosition = async (coordinates) => {
        this.setState({ coordinates });
        if (coordinates.length) {
            const latitude  = coordinates[0];
            const longitude = coordinates[1];

            await this.props.nominatimActions.searchNominatimPlace({ latitude, longitude });
        }
    }

    handleChangeInput = (e, value) => {
        const name = e.target.name;

        if (value.length > 250) {
            this.setState({ errorMsg: { [name]: 'Можно не более 250 символов' } });

            return;
        }


        this.setState({
            [name]   : value,
            errorMsg : {
                info    : '',
                address : ''
            }
        });
    }

    handleSearchAdress = async () => {
        const  { address } = this.state;

        await this.props.nominatimActions.searchNominatimCoordinates({ queryString: address });
    }

    render() {
        const { products, isLoading } = this.props;
        const defaultValuesForm = {};
        const {
            errorMsg,
            info,
            isClearProductsList,
            address,
            markerCoordinates,
            defaultCenter,
            coordinates,
            allBottleCount,
            bottledWaterCount,
            bottleCountError
        } = this.state;
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //eslint-disable-line
        const maxHeight = width < 1790 ? 400 : 530;

        return (
            <SimpleForm
                {...this.props}
                defaultValue = {defaultValuesForm}
                toolbar={<div />}
                redirect= {false} submitOnEnter = {false}
            >
                <div className = 'orderCreate__wrapper' >
                    <div className = 'orderCreate__submitForm'>
                        {products.length
                            ? (
                                <CreateShipmentForm
                                    productsList = {products}
                                    onChangeShipmentsData = {this.handleChangeShipmentsData}
                                    maxHeightList         = {maxHeight - 100}
                                    wrapperStyles         = {{ height: maxHeight }}
                                    isClearList           = {isClearProductsList}
                                />) : (<div className = 'errorStyle' >Товары отсутствуют</div>)
                        }
                        <div className = 'createOrder__serchBlock'>
                            <TextField
                                hintText='Город, улица, дом'
                                errorText= {errorMsg.address}
                                floatingLabelText='Aдрес заказа'
                                onChange = {this.handleChangeInput}
                                textareaStyle = {{ maxHeight: '100px' }}
                                fullWidth
                                multiLine
                                rowsMax ={2}
                                name = 'address'
                                value = {address}
                            />

                            <IconButton
                                onClick={this.handleSearchAdress.bind(this)}
                                disabled = {isLoading || !address}
                                tooltip = 'Поиск'
                                tooltipPosition = 'top-center'
                            >
                                <SearchIcon color='#00bcd4' />
                            </IconButton>
                        </div>
                        <TextField
                            hintText='Коментарий к заказу'
                            errorText= {errorMsg.info}
                            floatingLabelText='Дополнительная информация'
                            onChange = {this.handleChangeInput}
                            multiLine
                            textareaStyle = {{ maxHeight: '100px' }}
                            fullWidth
                            rowsMax ={2}
                            name = 'info'
                            value = {info}
                        />
                        <div className = 'orderBody__buttonContainer'>
                            <Button
                                label   = 'Оформить заказ'
                                customStyle = {{ width: '100%', backgroundColor: 'rgb(0, 188, 212)' }}
                                onClick = {this.handleSubmit.bind(this)}
                                isDisabled = {
                                    isLoading ||
                                    !this.state.products.length ||
                                    !coordinates.length ||
                                    allBottleCount > bottledWaterCount
                                }
                            />
                        </div>
                    </div>
                    <div className = 'createOrder__mapWrapper'>
                        <MapContainer
                            isDrivers = {false}
                            isLogo = {false}
                            isDraggable
                            defaultCenter = {defaultCenter}
                            customData =  {[ { coordinates: markerCoordinates, id: 0 } ]}
                            onPositionChanged = {this.handleChangePosition}
                        />
                    </div>
                </div>
                <span className = 'errorStyle' style = {{ height: 19 }}> {bottleCountError ? bottleCountError : '' } </span>
            </SimpleForm>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        nominatimActions : bindActionCreators(nominatimActions, dispatch),
        ordersAction     : bindActionCreators(ordersAction, dispatch),
        push             : bindActionCreators(pushAction, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        products          : state.ordersState.productsForOrder,
        admin             : state.admin,
        isLoading         : !!state.admin.loading,
        markerAddress     : state.nominatimState.markerAddress,
        markerCoordinates : state.nominatimState.markerCoordinates,
        status            : state.ordersState.status
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreateForm);

