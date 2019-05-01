import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { List }   from 'material-ui/List';

import ShipmentItem         from './ShipmentItem';


class CreateShipmentsList extends Component {
    static propTypes = {
        onRemoveShipment : PropTypes.func.isRequired,
        data             : PropTypes.array,
        maxHeight        : PropTypes.string
    }
    static defaultProps = {
        data      : [],
        maxHeight : '300px'
    }

    render() {
        const { data, maxHeight } = this.props;

        return (
            <List style = {{ maxHeight, overflowY: 'auto' }}>
                {data.map((item) => {
                    return (
                        <div  key = {item.id} >
                            <ShipmentItem data = {item} onRemoveShipment = {this.props.onRemoveShipment}  />
                        </div>
                    );
                })}
            </List>
        );
    }
}

export default CreateShipmentsList;
