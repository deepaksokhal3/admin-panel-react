import React     from 'react';
import Avatar    from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import './style.css';

function LogoField({ record }) {
    return record.imageUrl ?
        <div className ='providerList-item__image-block'>
            <div className = 'providerList-item__div-image'>
                <img src={record.imageUrl} className= 'providerList-item__image' />
            </div>
        </div>
        : <Avatar size = {80}>{record.name && record.name[0]}</Avatar>;
}

LogoField.propTypes = {
    record : PropTypes.arrayOf(PropTypes.object).isRequired
};


export default LogoField;
