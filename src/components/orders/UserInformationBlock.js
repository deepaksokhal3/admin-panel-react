import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import PhoneField           from '../PhoneField';
import './styles.css';

class UserInformationBlock extends Component {
    static propTypes = {
        secondName : PropTypes.string,
        data       : PropTypes.object,
        title      : PropTypes.string,
        source     : PropTypes.string.isRequired
    }
    static defaultProps = {
        secondName : '',
        data       : {},
        title      : ''
    }

    render() {
        const { secondName, title, data, source } = this.props;
        const isUserName  = secondName;
        const isUserPhone = !!data[source].phone;

        return (
            <div className = 'userInformation__wraper' >
                { isUserName || isUserPhone ? <div className = 'userInformation__title' >{title}</div> : <div /> }
                {
                    isUserName ? (
                        <div className = 'userInformation__infoBlock'>
                            <div className = 'userInformation__infoBlock-name'> Имя: </div>
                            <div className = 'userInformation__infoBlock-value'>{secondName}</div>
                        </div>
                    ) : <div />
                }
                {
                    isUserPhone ? (
                        <div className = 'userInformation__infoBlock'>
                            <div className = 'userInformation__infoBlock-name'> Телефон: </div>
                            <div className= 'userInformation__infoBlock-value'> <PhoneField  record = {data} isNested  source = {source} /> </div>
                        </div>
                    ) : <div />
                }
            </div>
        );
    }
}

export default UserInformationBlock;
