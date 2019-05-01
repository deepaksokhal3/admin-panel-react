import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar    from 'material-ui/Avatar';


import styles from './styles';

export default class Callout extends PureComponent {
    static propTypes = {
        driver : PropTypes.object.isRequired,
        isLogo : PropTypes.bool
    }

    static defaultProps = {
        isLogo : true
    };

    render() {
        const { isLogo, driver } = this.props;
        const { imageUrl, driverName, id } = driver;

        return (
            <div style={styles.wrapper} id = {id} >
                <div style={styles.container}>
                    {
                        isLogo
                            ? (
                                <Avatar
                                    src = {imageUrl || 'https://ukrainochka.ua/wp-content/uploads/2015/05/16_staff.jpg'}
                                    size = {50}
                                    style = {{ objectFit: 'cover' }}
                                />
                            ) : <span />
                    }
                    <div style={styles.name}>{driverName}</div>
                </div>
            </div>
        );
    }
}
