/*eslint-disable */
import React, { Component }   from 'react';
import PropTypes              from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Marker, Circle} from 'react-google-maps';

import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import CarIcon from '../carMarker.png';
import { prefetchUsers as usersActions }  from '../users/usersActions';
import Callout from './Callout';
import GoogleMapsWrapper from './GoogleMapWrapper';
import { DefaultMapCenter } from '../../constants';
import { radius } from '../../etc/config.json'

import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

class MapContainer extends Component {
    static propTypes = {
        prefetchUsers     : PropTypes.func,
        onPositionChanged : PropTypes.func,
        usersCordinates   : PropTypes.array,
        defaultCenter     : PropTypes.object,
        customData        : PropTypes.array,
        isDrivers         : PropTypes.bool,
        isLogo            : PropTypes.bool,
        isDraggable       : PropTypes.bool,
        MarkerIcon        : PropTypes.string,
        maxMarkers        : PropTypes.number,
        isProvider        : PropTypes.bool,
        radius            : PropTypes.number,
        eachCircleRadius  : PropTypes.array,
        getCoordinates    : PropTypes.func,
        firstSearch       : PropTypes.array,
        disabledMarker    : PropTypes.number,
        isDisabled        : PropTypes.bool,
        ownCenter         : PropTypes.bool
    };

    static defaultProps = {
        prefetchUsers     : ()=>{},
        onPositionChanged : ()=>{},
        usersCordinates   : [],
        customData        : [],
        isDrivers         : true,
        isLogo            : true,
        isDraggable       : false,
        MarkerIcon        : CarIcon,
        maxMarkers        : 1,
        isProvider        : false,
        radius            : radius,
        eachCircleRadius  : [],
        getCoordinates    : ()=>{},
        firstSearch       : false,
        loaded            : false,
        disabledMarker    : false,
        isDisabled        : false,
        ownCenter         : false
    };
    state = {
        timerId   : null,
        data      : [],
        isOpen    : false,
        currentId : '',
        xPrev     : '',
        xNew      : '',
        yPrev     : '',
        yNew      : '',
        markers    : [],
        lastActiveMarkerId: false,
        lastMarkerCoords : {},
        prevEachRadius: []
    }


    async componentWillMount() {
        if (this.props.isDrivers) {
            await this.props.prefetchUsers({status: 'ACTIVE'});
            const timerId = setInterval(  async () => await this.props.prefetchUsers({status: 'ACTIVE'}), 5000);

            this.setState({
                timerId,
                defaultCenter : this.props.defaultCenter
            });
        } else {
            this.setState({
                data : this.props.customData,
                defaultCenter : this.props.defaultCenter
            });
        }
        if(!this.props.defaultCenter) {
            this.setState({ defaultCenter: localStorage.providerLat ? {lat: +localStorage.providerLat, lng: +localStorage.providerLon} : DefaultMapCenter })
        }
    }

    componentDidUpdate(){
        const {firstSearch, defaultCenter, maxMarkers} = this.props
        const {data, markers} = this.state
        const compData = data;
        if(firstSearch && firstSearch[0] && !this.state.loaded){
            const data = [];
            firstSearch.forEach(coordinat => {
                data.push( {coordinates: {lat: coordinat.lat, lng: coordinat.lon}, id: coordinat.position} )
            })
            this.setState({data,
                loaded: true,
                defaultCenter
            })
        }
        if(maxMarkers < compData.length && this.state.loaded) {
            compData.pop()
            markers.pop()
            this.setState({data: compData, lastActiveMarkerId: compData.length - 1, markers});
        }
    }

    prepareCoordinates = (prevState, newState) => {
        // var timer = setInterval(function() {
        //     var timePassed =  - ;

        //     draw(timePassed);

        // }, 20);

        // function draw(timePassed) {
        //     console.log(timePassed)
        // };

        // const currentState = newState;
        // if( prevState.length && newState) {
        //     for (let i = 0; i < newState.length; i++) {
        //             const x1 = prevState[i].coordinates.lat;
        //             const x2 = newState[i].coordinates.lng;
        //             const y1 = prevState[i].coordinates.lat;
        //             const y2 = newState[i].coordinates.lng;

        //             var timer = setInterval(function() {
        //                 var newX =  Math.abs(x2 -x1);
        //                 var newY = Math.abs(y2 -y1);
        //                 console.log(    newState[i].driverName);
        //                draw({lat: newX, lng: newY});

        //             }, 700);

        //             function draw(timePassed) {
        //                console.log(timePassed)
        //             };
        //     }
        //     this.setState({
        //         animationId: timer
        //     });
        // }

        this.setState({
            data: newState
        });
    }

    componentWillReceiveProps(nextProps) {
        const { isDrivers, customData, usersCordinates, eachCircleRadius } = this.props;
        const { prevEachRadius } = this.state
        let compData = this.state.data;
        const nextData = nextProps.customData;
        if (isDrivers && (usersCordinates || nextProps.usersCordinates) ) {
            this.prepareCoordinates(usersCordinates, nextProps.usersCordinates)
        }

        if(customData && customData[0] && !isDrivers && customData[0].coordinates !== nextProps.customData[0].coordinates && Object.keys(nextProps.customData[0].coordinates).length ) {
            if(compData[0] && !compData[0].coordinates) compData = [];
            if(compData.length){
                nextData.forEach((item) => {
                const push = compData.some(elem => {
                    if(item.id === elem.id) return compData[elem.id] = item;
                })
                if(!push) compData.push(item[item.id]);
             });
            }
            else compData = nextProps.customData;
            this.setState({
                data : compData,
                center : nextProps.customData[0].coordinates
            });
            this.props.getCoordinates(compData, this.props.eachCircleRadius);
        }
        if(eachCircleRadius[0] && prevEachRadius[0]){
            const update = eachCircleRadius.some((rad, index) => {
                if(rad !== prevEachRadius[index]) return true
            })
            if(update) this.props.getCoordinates(this.state.data, eachCircleRadius)
        }
        if(eachCircleRadius[0]){
            const prevEachRadius = eachCircleRadius.map(rad => rad)
            this.setState({prevEachRadius})
        }
    }

    componentWillUnmount() {
        if (this.props.isDrivers) clearInterval(this.state.timerId);
        this.onMarkerMounted();
    }

    handleOpen(newId) {
        const { currentId, isOpen } = this.state;
        if (currentId !== newId) {
            this.setState({  currentId: newId, isOpen: true });
        } else if (isOpen) {
            this.setState({ isOpen: false });
        } else {
            this.setState({ isOpen: true });
        }
    }

    handleClose() {
        this.setState({ isOpen: false, currentId: '' });
    }

    onMarkerMounted = ref =>  {
        const allMarkers = this.state.markers
        if(ref) {
            allMarkers.push(ref);
            this.setState({lastActiveMarkerId: this.props.maxMarkers - 1})
        }
        this.setState({ marker: ref, markers: allMarkers });
    }
    onMapMounted = ref =>  this.setState({ mapRef: ref });
    onClick = (event) => {
        const lastId = this.state.lastActiveMarkerId;
        let compData = this.state.data;
        if(this.props.isDisabled) return
        if (this.props.disabledMarker !== false && this.props.disabledMarker === lastId && this.props.maxMarkers < 2) {
            return
        }
        if (this.props.isDrivers) {
            this.setState({
                currentId: null,
                isOpen: false
            });
            return;
        }
        if(compData[0] && !compData[0].coordinates) compData = [];
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const data = {coordinates: {lat, lng}, id: this.props.maxMarkers === 1 ? 0 : compData.length};
        this.props.onPositionChanged([lat, lng])
        if(lastId !== false && compData.length === this.props.maxMarkers){
            data.id = lastId;
            compData.forEach((item, index) => {if (item.id === lastId) compData[index] = data});
        }
        if(compData.length < this.props.maxMarkers){
            compData.push(data);
            this.setState({data: compData});
        }
        this.props.getCoordinates(compData, this.props.eachCircleRadius);
        this.setState({data: compData })
    }

    onPositionEnd(id) {
        const compData = this.state.data;
        const lat =  this.state.markers[id].getPosition().lat();
        const lng =  this.state.markers[id].getPosition().lng();
        const newCoordinates = [lat, lng];
        const data = {coordinates: {lat, lng}, id};
        this.props.onPositionChanged(newCoordinates);
        compData.forEach((item, index) => {if (item.id === id) compData[index] = data});
        this.props.getCoordinates(compData, this.props.eachCircleRadius);
    }

    onPositionMoved(id){
        const compData = this.state.data;
        const lat =  this.state.markers[id].getPosition().lat();
        const lng =  this.state.markers[id].getPosition().lng();
        const data = {coordinates: {lat, lng}, id};
        compData.forEach((item, index) => { if (item.id === id) compData[index] = data });
        this.setState({lastActiveMarkerId: id});
        this.props.getCoordinates(compData, this.props.eachCircleRadius);
    }

    render() {
        const { data, isOpen, currentId, defaultCenter, center } = this.state;
        const { isDraggable, isLogo, MarkerIcon, isProvider, radius, eachCircleRadius, disabledMarker, ownCenter } = this.props;
        return (
            <GoogleMapsWrapper
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                defaultZoom={8}
                center = {ownCenter ? center || defaultCenter : defaultCenter}
                ref={this.onMapMounted}
                onClick = {this.onClick.bind(this)}
            >
                <MarkerClusterer
                    averageCenter
                    maxZoom = {9}
                >
                    {data.map((item, index) => {
                        return (
                            item.coordinates ? (<Marker
                                position={item.coordinates}
                                onClick={! isDraggable ?  this.handleOpen.bind(this, item.id) : null}
                                key = {item.id}
                                icon ={MarkerIcon}
                                draggable = {isDraggable ? index === disabledMarker ? false : true : false }
                                onDragEnd = {this.onPositionEnd.bind(this, item.id)}
                                onDrag = {this.onPositionMoved.bind(this, item.id)}
                                ref={this.onMarkerMounted}
                                animation =  {google.maps.Animation.DROP}
                            >
                               {isProvider && <Circle
                                         options = { {
                                            strokeColor : '#1E98FF',
                                            strokeOpacity : 0.8,
                                            strokeWeight : 2,
                                            fontColor: 'red',
                                            fillColor : '#1E98FF',
                                            fillOpacity : 0.35
                                            } }
                                        center = {item.coordinates}
                                        radius = {eachCircleRadius[index] ? eachCircleRadius[index] : radius}
                                        draggable = {false}
                                        >
                                </Circle>}
                                {!isDraggable && isOpen && item.id === currentId &&
                                    <InfoBox
                                        options={{
                                            disableAutoPan: false
                                            ,closeBoxURL: ''
                                            ,isHidden: false
                                            ,pane: 'floatPane'
                                            ,enableEventPropagation: false,
                                            pixelOffset: new google.maps.Size(-130, isLogo ? -140 : -110)
                                        }}
                                    >
                                        <Callout driver = {item} isLogo = {isLogo} />
                                    </InfoBox>}
                            </Marker>) : null
                        );
                    }
                    )}
                </MarkerClusterer>
            </GoogleMapsWrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
        usersCordinates : state.usersState.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prefetchUsers : bindActionCreators(usersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
