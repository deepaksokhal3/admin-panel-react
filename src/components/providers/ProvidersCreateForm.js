import React, { Component }             from 'react';
import PropTypes                        from 'prop-types';
import { TextInput, SimpleForm }                    from 'admin-on-rest';
import { Field }                        from 'redux-form';
import { CopyToClipboard }              from 'react-copy-to-clipboard';
import IconButton                       from 'material-ui/IconButton';
import CopyIcon                         from 'material-ui/svg-icons/content/content-copy';
import CopyDone                         from 'material-ui/svg-icons/action/done-all';
import SelectField                      from 'material-ui/SelectField';
import MenuItem                         from 'material-ui/MenuItem';
import SearchIcon       from 'material-ui/svg-icons/action/search';
import TextField              from 'material-ui/TextField';
import { push as pushAction } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as nominatimActions from '../../NominatimActions';
import Button             from '../Button';

import MapContainer                     from '../map/MapContainer';
import UploadImagesBlock                from '../UploadImagesBlock';
import { defaultProviderPhoto, apiUrl, radius } from '../../etc/config.json';
import MarkerIcon from '../Marker.svg';
import * as providersActions from './providersActions';
import styles                           from './styles';
import './style.css';

class ProvidersCreateForm extends Component {
    static propTypes = {
        record            : PropTypes.object.isRequired,
        isEdit            : PropTypes.bool,
        push              : PropTypes.func,
        nominatimActions  : PropTypes.object.isRequired,
        markerAddress     : PropTypes.string,
        markerCoordinates : PropTypes.object,
        city              : PropTypes.string,
        defaultValuesForm : PropTypes.object,
        providersActions  : PropTypes.object.isRequired,
        validate          : PropTypes.func,
        redirect          : PropTypes.string,
        maxMarkers        : PropTypes.number
    }
    static defaultProps = {
        isEdit            : false,
        push              : () => {},
        markerAddress     : '',
        city              : '',
        markerCoordinates : {},
        defaultValuesForm : {},
        validate          : () => {},
        redirect          : false,
        maxMarkers        : 1
    }
    state = {
        copied           : false,
        currency         : 'UAH',
        email            : '',
        phone            : '',
        image            : this.props.defaultValuesForm.image,
        address          : '',
        point            : [],
        errorMsg         : { city: '' },
        coordinates      : [],
        city             : '',
        eachCircleRadius : [],
        name             : ''
    };

    componentWillMount() {
        const { record, isEdit } = this.props;

        if (!isEdit) return;
        record.coordinates = [ record.coordinates[0] ];
        for (const key in this.state) {
            if (record[key]) {
                this.setState({ [key]: record[key] });
            }
        }
        this.setState({ image: record.imageUrl.split('/images/')[1], id: record.id });
    }

    componentWillReceiveProps(nextProps) {
        const { markerCoordinates, markerAddress } = this.props;

        if (markerCoordinates !== nextProps.markerCoordinates && nextProps.markerCoordinates.lat) {
            const { lat, lng } = nextProps.markerCoordinates;
            const point = [ lat, lng ];

            this.setState({
                markerCoordinates : nextProps.markerCoordinates,
                errorMsg          : { city: '' },
                point
            });
        }

        if (markerCoordinates !== nextProps.markerCoordinates && !Object.keys(nextProps.markerCoordinates).length) {
            this.setState({ errorMsg: { city: 'Город не найден, поставте маркер на карте' }, point: [] });
        }

        if (markerAddress !== nextProps.markerAddress) this.setState({ city: nextProps.city, errorMsg: { city: '' } });

        if (markerAddress !== nextProps.markerAddress && !nextProps.city) this.setState({ errorMsg: { city: 'Город не найден' }, city: '' });
    }

    handleChangeInput = (e, value) => {
        if (!value) {
            this.setState({ errorMsg: { city: 'Город: Обязательное поле' }, city: value });

            return;
        }
        if (this.state.coordinates[0]) {
            this.setState({ coordinates: [], city: value, errorMsg: { city: 'Нажмите на поиск' } });

            return;
        }
        this.setState({
            city     : value,
            errorMsg : {
                city : ''
            }
        });
        if (!this.state.coordinates[0]) this.setState({ errorMsg: { city: 'Нажмите на поиск' } });
    }

    handleOnCopied = () => {
        this.setState({
            copied : true
        });
    }
    handleSubmit = () => {
        const { phone, name, image, email, currency, coordinates, address, city, id } = this.state;


        if (!this.props.isEdit) this.props.providersActions.createProvider({ phone, name, image, email, currency, coordinates, address, city });
        else this.props.providersActions.updateProvider({ phone, name, image, email, currency, coordinates, address, city }, id);
        this.props.push('/providers');
    }

    handleSearchAdress = () => {
        const  { city } = this.state;

        this.props.nominatimActions.searchNominatimCoordinates({ queryString: city });
    }

    handleChange = (event, index, value) => {
        this.setState({ currency: value });
        this.props.record.currency = null;
    }

    handleChangePosition = async (point) => {
        this.setState({ point });
        if (point.length) {
            const latitude  = point[0];
            const longitude = point[1];

            await this.props.nominatimActions.searchNominatimPlace({ latitude, longitude });
        }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSearchAdress();
        }
    }

    getCoordinates = (coords, radiuses) => {
        const coordinates = coords.map(pnt => {
            const coordinat = {};

            coordinat.position = pnt.id;
            coordinat.lat = pnt.coordinates.lat;
            coordinat.lon = pnt.coordinates.lng;
            radiuses.forEach((rad, index) => {
                if (pnt.id === index) coordinat.radius = rad;
            });
            if (!coordinat.radius) coordinat.radius = radius;

            return coordinat;
        });

        this.setState({ coordinates });
    }

    normalizeImg = (value) => this.setState({ image: value });
    normalizeEmail = (value) => {
        this.setState({ email: value });

        return value;
    }
    normalizePhone = (value) => {
        this.setState({ phone: value });

        return value;
    }
    normalizeAddress = (value) => {
        this.setState({ address: value });

        return value;
    }
    normalizeName = (value) => {
        this.setState({ name: value });

        return value;
    }

    render() {
        const { record, isEdit, validate, maxMarkers } = this.props;
        const state = this.state;
        const defCoords = record.coordinates && record.coordinates[0] ? record.coordinates : null;
        const { copied, markerCoordinates, city, errorMsg, currency, eachCircleRadius } = state;
        const { inputsErrorStyle } = styles;
        const errorStyle = errorMsg.city === 'Нажмите на поиск' ? { color: 'green', width: '180px' } : { color: 'red', width: '180px' };

        return (
            <SimpleForm
                toolbar={<div />}
                redirect = {false}
                submitOnEnter = {false}
                {...this.props}
            >
                <div className = 'ProviderForm__wrapper'>
                    <Field
                        name='image'
                        component = {UploadImagesBlock}
                        imagePreviewUrl = {record.imageUrl  || defaultProviderPhoto}
                        formType = 'Provider'
                        normalize = {this.normalizeImg}
                        apiUrl = {apiUrl}
                    />
                    <div className = 'ProviderForm__inputs'>
                        <div className = 'ProviderForm__inputs-small'>
                            <Field
                                name='phone'
                                label='resources.provider.phone'
                                component = {TextInput}
                                normalize = {this.normalizePhone}
                                options={{ ...inputsErrorStyle, className: 'ProviderForm__phone' }}
                            />
                            <Field
                                name='name'
                                label='resources.provider.name'
                                component = {TextInput}
                                normalize = {this.normalizeName}
                                options={{ ...inputsErrorStyle, className: 'ProviderForm__phone' }}
                            />
                            <Field
                                normalize = {this.normalizeEmail}
                                label='resources.provider.email'
                                name='email'
                                component = {TextInput}
                                options={{ ...inputsErrorStyle,  hintText: 'company@mail.ua' }}
                            />
                        </div>
                        <div className = 'ProviderForm__inputs-new'>
                            <div className = 'Provider__serchBlock'>
                                <TextField
                                    name='city'
                                    onKeyPress = {this.handleKeyPress}
                                    errorStyle={errorStyle}
                                    errorText= {errorMsg.city}
                                    floatingLabelFocusStyle = {errorMsg.city ? errorStyle : null}
                                    floatingLabelText='Город'
                                    onChange = {this.handleChangeInput}
                                    textareaStyle = {{ maxHeight: '100px' }}
                                    fullWidth
                                    rowsMax ={1}
                                    value = {city}
                                />

                                <IconButton
                                    onClick={this.handleSearchAdress}
                                    disabled = {!city}
                                    tooltip = 'Поиск'
                                    tooltipPosition = 'top-center'
                                >
                                    <SearchIcon color='#00bcd4' />
                                </IconButton>
                            </div>
                            <div className = 'Provider__serchBlock'>
                                <SelectField
                                    label='resources.provider.currency'
                                    name = 'currency'
                                    floatingLabelText='Валюта'
                                    value={currency}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value={'BYN'} primaryText='BYN' />
                                    <MenuItem value={'RUB'} primaryText='RUB' />
                                    <MenuItem value={'UAH'} primaryText='UAH' />
                                    <MenuItem value={'KZT'} primaryText='KZT' />
                                </SelectField>
                            </div>
                        </div>
                        { isEdit ?
                            <CopyToClipboard
                                text={record.id}
                                onCopy={this.handleOnCopied}
                            >
                                <div className = 'clipboardBlock'>
                                    <div>Идентификатор поставщика</div>
                                    <div className = 'idLabelValue'>{record.id}</div>
                                    <IconButton  tooltip={`${copied ? 'Скопировано' : ''}`} tooltipPosition='top-center'>
                                        {copied ? <CopyDone className = 'allDoneIcon' /> : <CopyIcon />}
                                    </IconButton>
                                </div>
                            </CopyToClipboard> : <div />
                        }
                        <Field
                            name ='address'
                            component = {TextInput}
                            normalize = {this.normalizeAddress}
                            label = 'resources.provider.address'
                            options = {{ ...inputsErrorStyle, fullWidth: true }}
                        />
                    </div>
                    <div className = 'ProviderForm__mapWrapper'>
                        <MapContainer
                            getCoordinates = {this.getCoordinates}
                            isDrivers = {false}
                            isLogo = {false}
                            isDraggable
                            onPositionChanged = {this.handleChangePosition}
                            customData =  {[ { coordinates: markerCoordinates, id: 0 } ]}
                            eachCircleRadius = {null || eachCircleRadius}
                            maxMarkers = {maxMarkers}
                            isProvider
                            defaultCenter = {defCoords ? { lat: defCoords[0].lat, lng: defCoords[0].lon } : null}
                            firstSearch = {defCoords}
                            MarkerIcon = {MarkerIcon}
                            ownCenter
                        />
                    </div>
                </div>
                <div className = 'provider__buttonContainer'>
                    <Button
                        label   = 'Сохранить'
                        customStyle = {{ width: '100%', backgroundColor: 'rgb(0, 188, 212)' }}
                        onClick = {this.handleSubmit}
                        isDisabled = {
                            !state.address
                            || !state.city
                            || !state.coordinates[0]
                            || !state.name
                            || !state.email
                            || !state.phone
                            || !state.currency
                            || validate(state)
                        }
                    />
                </div>
            </SimpleForm>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        providersActions : bindActionCreators(providersActions, dispatch),
        nominatimActions : bindActionCreators(nominatimActions, dispatch),
        push             : bindActionCreators(pushAction, dispatch)
    };
}
function mapStateToProps(state) {
    return {
        markerAddress     : state.nominatimState.markerAddress,
        markerCoordinates : state.nominatimState.markerCoordinates,
        city              : state.nominatimState.city
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProvidersCreateForm);
