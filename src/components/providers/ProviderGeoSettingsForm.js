import React, { Component }             from 'react';
import { connect }            from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PropTypes              from 'prop-types';

import Slider from 'material-ui/Slider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import MarkerIcon from '../Marker.svg';
import * as nominatimActions from '../../NominatimActions';
import Button             from '../Button';
import MapContainer                     from '../map/MapContainer';
import { radius } from '../../etc/config.json';
import { checkDistance } from '../../utils';
import * as providersActions from './providersActions';
import './style.css';


class ProviderGeoSettingsForm extends Component {
    static propTypes = {
        provider         : PropTypes.object.isRequired,
        providersActions : PropTypes.object.isRequired,
        push             : PropTypes.func
    }

    static defaultProps ={
        push : () => {}
    }

    state = {
        providerId       : localStorage.providerId,
        coordinates      : [],
        maxMarkers       : 1,
        eachCircleRadius : [],
        loaded           : false,
        sliders          : [],
        markerCount      : 1
    }

    componentWillMount() {
        const { prefetchProvider } = this.props.providersActions;
        const { providerId } = this.state;

        prefetchProvider(providerId);
    }

    componentWillReceiveProps() {
        const { provider } = this.props;
        const { eachCircleRadius, sliders } = this.state;

        if (provider && !this.state.loaded) {
            const { coordinates } = provider;
            const normalCoordinates = [];

            if (coordinates) {
                coordinates.forEach(coordinat => {
                    sliders.push({ value: coordinat.radius, id: coordinat.position });
                    eachCircleRadius.push(coordinat.radius);
                    normalCoordinates.push(coordinat);
                });
                this.setState({
                    coordinates : normalCoordinates,
                    loaded      : true,
                    sliders,
                    eachCircleRadius,
                    maxMarkers  : coordinates.length,
                    markerCount : coordinates.length
                });
            }
        }
    }

    componentDidUpdate() {
        const { maxMarkers, markerCount } = this.state;

        // eslint-disable-next-line
        if (markerCount > maxMarkers) this.setState({ markerCount: markerCount - 1 });
    }

    handleChangePosition = async (point) => {
        this.setState({ point });
    }

    handleSlider = (id, event, value) => {
        const { sliders, eachCircleRadius } = this.state;

        sliders[id] = { value, id };
        eachCircleRadius[id] = value;
        this.setState({ sliders, eachCircleRadius });
    }

    handleAdd = () => {
        const { maxMarkers, sliders, eachCircleRadius } = this.state;

        if (maxMarkers < 5) {
            sliders.push({ value: radius, id: sliders.length });
            eachCircleRadius.push(radius);

            this.setState({ maxMarkers: maxMarkers + 1, sliders, eachCircleRadius });
        }
    }

    handleRemove = () => {
        const { maxMarkers, sliders, eachCircleRadius, coordinates } = this.state;

        if (maxMarkers > 1) {
            sliders.pop();
            if (sliders.length < coordinates.length) {
                eachCircleRadius.pop();
                coordinates.pop();
            }
            this.setState({ maxMarkers: this.state.maxMarkers - 1, coordinates });
        }
    }

    handleSubmit = () => {
        const { coordinates, providerId } = this.state;

        this.props.providersActions.updateProvider({ coordinates }, providerId);
        this.props.providersActions.clearStore();
        this.props.push('/products');
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

        this.setState({ coordinates, markerCount: coordinates.length });
    }


    render() {
        const  { maxMarkers, eachCircleRadius, coordinates, sliders } = this.state;
        const defCoords = coordinates[0] ? coordinates : null;
        let distanceError;
        let disableButton = false;

        if (coordinates[0] && checkDistance(coordinates[0], coordinates) > (radius * 2) / 1000) {
            distanceError = 'Точки на карте слишком далеко друг от друга';
            disableButton = true;
        }


        return (
            <div className = 'ProviderForm__wrapper_geo'>
                <div className = 'settingsPanel'>
                    <div className = 'settingsControlsBlock'>
                        <div className = 'Add_Delete_Buttons'>
                            <span className = 'add_DellText' style = {{ height: 5 }}>Добавить точку</span>
                            <FloatingActionButton mini onClick = {this.handleAdd}>
                                <ContentAdd />
                            </FloatingActionButton>
                            <span className = 'add_DellText' style = {{ height: 5 }}>Удалить точку</span>
                            <FloatingActionButton mini secondary onClick = {this.handleRemove} >
                                <ContentRemove />
                            </FloatingActionButton>
                        </div>
                        <div className= 'Slider'>
                            {sliders.map((item, index) => {
                                return (
                                    <div key = {item.id} className='slider_Wraper'>
                                        <span style = {{ height: 5, 'margin-bottom': '20px', 'margin-top': '20px' }}>Радиус № {item.id + 1} : {item.value === 50000 ? 50 : (item.value - 1) / 1000} км</span>
                                        <div className = 'show_Radius'>
                                            <span className ='minMax'>0 км</span>
                                            <Slider
                                                style={{
                                                    'margin-top' : '-20px',
                                                    height       : '20px',
                                                    display      : 'flex',
                                                    width        : '120px'
                                                }}
                                                min={1}
                                                key = {item.id}
                                                max={radius}
                                                step={100}
                                                value={item.value}
                                                onChange={this.handleSlider.bind(this, index)}
                                            />
                                            <span className ='minMax'>50 км</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className = 'provider__buttonContainer_geo'>
                        <div className='imgWrapper'>
                            <div className='marker_Container'>
                                <span className = 'helperText' style = {{ height: 5 }}>Для передвижения зоны покрытия нажмите и удерживайте маркер</span>
                                <img style={{ width: '40px', height: '40px', 'margin-top': '20px' }} src = {MarkerIcon} />
                            </div>
                            <span className = 'helperText' style = {{ height: 5 }}>Удалить или изменить местоположение центральной зоны покрытия нельзя</span>
                        </div>
                        <Button
                            label   = 'Сохранить'
                            customStyle = {{ width: '100%', backgroundColor: 'rgb(0, 188, 212)' }}
                            onClick = {this.handleSubmit}
                            isDisabled = {disableButton}
                        />
                        <span className = 'errorStyle' style = {{ height: 5 }}> {distanceError ? distanceError : '' } </span>
                    </div>
                </div>
                <div className = 'ProviderForm__mapWrapper_geo'>
                    <MapContainer
                        getCoordinates = {this.getCoordinates}
                        isDrivers = {false}
                        isLogo = {false}
                        maxMarkers = {maxMarkers}
                        eachCircleRadius = {eachCircleRadius}
                        isDraggable
                        onPositionChanged = {this.handleChangePosition}
                        isProvider
                        MarkerIcon = {MarkerIcon}
                        firstSearch = {defCoords}
                        defaultCenter = {defCoords ? { lat: defCoords[0].lat, lng: defCoords[0].lon } : null}
                        disabledMarker = {0}
                        ownCenter
                    />
                </div>
            </div>
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
        provider : state.providersState.data
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProviderGeoSettingsForm);
