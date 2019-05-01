import React       from 'react';
import pure        from 'recompose/pure';
import PropTypes   from 'prop-types';
import AvatarField from '../AvatarField';
import style       from '../users/styles';

function DriverNameField(props) {
    const { record, isAvatar, source } = props;  //eslint-disable-line
    const clearUser = Object.keys(record.driver).length ? record.driver : null;

    return clearUser ? (
        <div style = {style.fullNameField}>
            { isAvatar ? <AvatarField record={clearUser} size={60} /> : <div /> }
            <span style={{ display: 'inline-block', width: 20 }}>&nbsp;</span>
            {clearUser.secondName}
        </div>
    ) : (
        <div style = {{ height: 70 }} />
    );
}


const PureDriverNameField = pure(DriverNameField);

DriverNameField.propTypes = {
    record : PropTypes.arrayOf(PropTypes.object).isRequired
};

PureDriverNameField.defaultProps = {
    source   : 'firstName',
    isAvatar : false,
    label    : 'resources.orders.driverName'
};

export default PureDriverNameField;
