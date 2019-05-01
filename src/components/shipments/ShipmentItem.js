import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Avatar               from 'material-ui/Avatar';
import ContentClose         from 'material-ui/svg-icons/navigation/close';
import './styles.css';

class ShipmentItem extends Component {
    static propTypes = {
        data             : PropTypes.array,
        onRemoveShipment : PropTypes.func.isRequired
    }
    static defaultProps = {
        data : []
    }

    handleOnRemoveItem = (id) => {
        this.props.onRemoveShipment(id);
    }

    render() {
        const { data } = this.props;

        return (
            <div className = 'listItemWrapper'>
                <div className = 'productNameBlock'>
                    <Avatar src = {data.imageUrl}  style = {{ borderRadius: 0 }} />
                    <span className = 'productItemName' >{data.name}</span>
                    <span>{data.count} шт</span>
                </div>
                <FloatingActionButton
                    type = 'button'
                    mini
                    className = 'btn'
                    secondary
                    onClick = {this.handleOnRemoveItem.bind(this, data.id)}
                >
                    <ContentClose className = 'removeItemIconStyle' />
                </FloatingActionButton>
            </div>
        );
    }
}

export default ShipmentItem;
