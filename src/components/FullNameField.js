import React       from 'react';
import pure        from 'recompose/pure';
import PropTypes   from 'prop-types';
import style       from './users/styles';
import AvatarField from './AvatarField';

function FullNameField({ record = {}, withoutStatus }) {
    return (
        <div style = {style.fullNameField}>
            <AvatarField record={record}  withoutStatusImg = {withoutStatus} />
            <span style={{ display: 'inline-block', width: 20 }}>&nbsp;</span>
            <div> {record.firstName} {record.secondName} </div>
        </div>
    );
}


const PureFullNameField = pure(FullNameField);

FullNameField.propTypes = {
    record        : PropTypes.arrayOf(PropTypes.object).isRequired,
    withoutStatus : PropTypes.bool //eslint-disable-line
};

PureFullNameField.defaultProps = {
    source        : 'firstName',
    withoutStatus : false,
    label         : 'resources.drivers.fields.name'
};

export default PureFullNameField;
