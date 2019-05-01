import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import FlatButton           from 'material-ui/FlatButton';
import AddBtnIcon           from 'material-ui/svg-icons/content/add-box';
import { Card }             from 'material-ui/Card';
import styles               from '../styles';
import Dropdown             from '../Dropdown';
import Counter              from '../Counter';
import { shipmentTypes }    from '../../etc/config.json';
import CreateShipmentsList  from './CreateShipmentsList';

class CreateShipmentForm extends Component {
    static propTypes = {
        productsList          : PropTypes.array,
        isShipment            : PropTypes.bool,
        onChangeShipmentsData : PropTypes.func.isRequired,
        maxHeightList         : PropTypes.string,
        wrapperStyles         : PropTypes.object,
        isClearList           : PropTypes.bool
    }
    static defaultProps = {
        productsList  : [],
        maxHeightList : '400px',
        wrapperStyles : {},
        isClearList   : false,
        isShipment    : false
    }

    state = {
        productCount      : 0,
        bottleCount       : 0,
        allProductsCount  : 0,
        productId         : '',
        type              : 'product',
        shipmentsList     : [],
        productsList      : [],
        shipmentType      : 'TOOK',
        bottledWaterCount : 0
    }

    componentWillMount() {
        const { productsList } = this.props;

        this.setState({
            productsList
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isClearList && nextProps.isClearList) this.setState({ shipmentsList: [] });
    }
    handleSetCounterValue = value => this.setState({ productCount: value });

    handleSetDropdownValue = value => this.setState({ productId: value });
    handleSetShipmentType = value => {
        const { shipmentsList, allProductsCount, bottleCount } = this.state;

        this.setState({ shipmentType: value });
        this.props.onChangeShipmentsData(shipmentsList, allProductsCount, bottleCount, value);
    }

    handleAddShipment = () => {
        const { onChangeShipmentsData } = this.props;
        const {
            productCount,
            productId,
            type,
            shipmentsList,
            productsList,
            allProductsCount,
            bottleCount,
            shipmentType,
            bottledWaterCount
        } = this.state;
        const cleanData = { id: productId, count: productCount, type };
        const currentProduct = productsList.find(product => product.id === productId);
        const newStateShipmentsList = [ ...shipmentsList, Object.assign(cleanData, currentProduct) ];
        const currentProductsList = productsList.filter((item) => {
            if (item.id !== productId) return item;
        });

        const isProduct = currentProduct.type !== 'BOTTLE';
        const isBottle = currentProduct.type === 'BOTTLE';
        const isBottledWater = currentProduct.type === 'BOTTLED_WATER';
        const currentAllProductsCount = isProduct ? allProductsCount + productCount : allProductsCount;
        const currentBottleCount = isBottle ? productCount : bottleCount;
        const currentBottledWaterCount = isBottledWater ? productCount : bottledWaterCount;

        this.setState({
            shipmentsList     : newStateShipmentsList,
            productsList      : currentProductsList,
            allProductsCount  : currentAllProductsCount,
            bottleCount       : currentBottleCount,
            bottledWaterCount : currentBottledWaterCount
        });


        onChangeShipmentsData(newStateShipmentsList, currentAllProductsCount, currentBottleCount, shipmentType, currentBottledWaterCount);
        this.setState({
            productCount : 0,
            productId    : ''
        });
    }

    handleRemoveShipment = (id) => {
        const { shipmentsList, allProductsCount, bottleCount, shipmentType, bottledWaterCount } = this.state;
        const { productsList, onChangeShipmentsData } = this.props;
        let currentAllProductsCount = allProductsCount;
        let currentAllBottleCount = bottleCount;
        let currentBottledWaterCount = bottledWaterCount;

        const newShipmentsList = shipmentsList.filter((item) => {
            if (item.id === id && item.type === 'BOTTLED_WATER') {
                currentBottledWaterCount -= item.count;
                this.setState({ bottledWaterCount: currentBottledWaterCount });
            }
            if (item.id === id && item.type !== 'BOTTLE') {
                currentAllProductsCount -= item.count;
                this.setState({ allProductsCount: currentAllProductsCount });
            }
            if (item.id === id && item.type === 'BOTTLE') {
                currentAllBottleCount = 0;
                this.setState({ bottleCount: currentAllBottleCount });
            }
            if (item.id !== id) return item;
        });

        const currentProduct = productsList.find(product => product.id === id);

        onChangeShipmentsData(newShipmentsList, currentAllProductsCount, currentAllBottleCount, shipmentType, currentBottledWaterCount);

        this.setState({
            shipmentsList : newShipmentsList,
            productsList  : [ currentProduct, ...this.state.productsList ]
        });
    }

    render() {
        const {
            productCount,
            shipmentsList,
            productsList,
            productId
        } = this.state;
        const { CreateShipmentFormStyles, DropdownStyles, AddItemBlock, CounterStyles, ButtonStyles } = styles;
        const { maxHeightList, wrapperStyles, isShipment } = this.props;

        return (
            <Card style = {{ ...CreateShipmentFormStyles, ...wrapperStyles }} >
                {isShipment ?
                    <Dropdown
                        data = {shipmentTypes}
                        onSetDropdownValue = {this.handleSetShipmentType}
                        styles = {{ ...DropdownStyles, width: 170 }}
                        value = 'TOOK'
                        label = 'Тип отгруза'
                    />
                    : null}
                <div style = {AddItemBlock} >
                    <Dropdown
                        data = {productsList}
                        onSetDropdownValue = {this.handleSetDropdownValue}
                        styles = {DropdownStyles}
                        value = {null}
                        label = 'Выбрать товар'
                    />
                    <Counter
                        onSetCounterValue = {this.handleSetCounterValue}
                        value = {productCount}
                        styles = {CounterStyles}
                        minVal={0}
                    />
                    <FlatButton
                        icon={<AddBtnIcon />}
                        onClick = {this.handleAddShipment}
                        style  = {{ marginBottom: '8px' }}
                        hoverColor= {ButtonStyles.hoverColor}
                        backgroundColor = {ButtonStyles.backgroundColor}
                        disabled = {!productCount || productCount < 1 || !productId}
                    />
                </div>
                <CreateShipmentsList
                    data = {shipmentsList}
                    maxHeight = {maxHeightList}
                    onRemoveShipment = {this.handleRemoveShipment}
                />
            </Card>
        );
    }
}

export default CreateShipmentForm;
