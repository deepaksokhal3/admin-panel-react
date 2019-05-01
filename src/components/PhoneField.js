import React from 'react';
import PropTypes from 'prop-types';

function PreparePhone(number) {
    if (!number) return '';
    const cleanNumber = number.replace(/\s+/g, '');
    let result = cleanNumber;

    if (cleanNumber.includes('+380')) result = cleanNumber.replace(/(\+38)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
    if (cleanNumber.includes('+7')) result = cleanNumber.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
    if (cleanNumber.includes('+375')) result = cleanNumber.replace(/(\+375)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');

    return result;
}

function PhoneField({ source, record = {}, isNested }) {
    return isNested ?
        <span>{PreparePhone(record[source] && record[source].phone)}</span>
        :
        <span>{PreparePhone(record[source])}</span>;
}

PhoneField.propTypes = {
    addLabel : PropTypes.bool, //eslint-disable-line
    isNested : PropTypes.bool,
    record   : PropTypes.object,
    source   : PropTypes.string.isRequired
};

PhoneField.defaultProps = {
    addLabel : true,
    isNested : false,
    record   : {}
};

export default PhoneField;
