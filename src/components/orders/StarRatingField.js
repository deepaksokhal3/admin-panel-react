import React from 'react';
import Icon from 'material-ui/svg-icons/action/opacity';
import PropTypes from 'prop-types';


let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //eslint-disable-line
const  size = width > 1440 ?  18 : 14;

const style = { opacity: 0.5, width: size, height: size };


function StarRatingField({ record }) { //eslint-disable-line
    return record.rating ? (
        <span>
            {Array(record.rating).fill(true).map(item => <Icon key={item.id} style={style} />)}
        </span>
    ) : <div />;
}

StarRatingField.PropTypes = {
    record   : PropTypes.array,
    addLabel : PropTypes.bool
};

StarRatingField.defaultProps = {
    label    : 'resources.orders.rating',
    source   : 'rating',
    addLabel : true,
    sortable : true
};

export default StarRatingField;
