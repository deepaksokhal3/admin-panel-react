import React     from 'react';
import Avatar    from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import './style.css';

function AvatarField({ record, size, withoutStatusImg }) {
    const { isAvailable, imageUrl } = record;

    return imageUrl ?
        <div className = 'AvatarWrapper'>
            <div className = 'Avatar' style = {{ height: size, width: size }}>
                <img src={record.imageUrl} className = 'avatarImg' />
            </div>
            { withoutStatusImg ? null : <i className = {`fas fa-user-${isAvailable ? 'check' : 'clock'} avatarStatus-${isAvailable ? 'ok' : 'no'}`} />}
        </div>
        :
        <div className = 'AvatarWrapper'>
            <Avatar
                style = {{ height: size, width: size }}
            >
                {record.firstName && record.firstName[0] || record.secondName &&  record.secondName[0] }
            </Avatar>
            { withoutStatusImg ? null : <i className = {`fas fa-user-${isAvailable ? 'check' : 'clock'} avatarStatus-${isAvailable ? 'ok' : 'no'}`} />}
        </div>;
}

AvatarField.propTypes = {
    record           : PropTypes.arrayOf(PropTypes.object).isRequired,
    size             : PropTypes.number,
    withoutStatusImg : PropTypes.bool
};

AvatarField.defaultProps = {
    size             : 50,
    withoutStatusImg : false
};

export default AvatarField;
