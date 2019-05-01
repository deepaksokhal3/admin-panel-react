import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Card }             from 'material-ui/Card';
import Counter              from '../Counter';
import { adminCoins }       from '../../etc/config.json';
import '../orders/styles.css';

class SetCoinForm extends Component {
    static propTypes = {
        providerCoins : PropTypes.number.isRequired,
        driverCoins   : PropTypes.number.isRequired,
        onChangeCoins : PropTypes.func.isRequired,
        isAdmin       : PropTypes.bool
    }

    static defaultProps = {
        isAdmin : false
    }

    state = {
        providerCoins : this.props.providerCoins,
        driverCoins   : this.props.driverCoins
    }

    handleChangeCoins = (coins) => {
        this.setState({
            providerCoins : +this.props.providerCoins - coins,
            driverCoins   : +this.props.driverCoins + coins
        }, this.props.onChangeCoins(coins));
    }

    render() {
        const { providerCoins, driverCoins, isAdmin } = this.props;

        return (
            <Card >
                <div className = 'coinsWrapper' >
                    <div className = 'coinsInfoBlock' style = {isAdmin ? { height: 'auto' } : null}>
                        {!isAdmin
                            ? (
                                <div className = 'userInformation__infoBlock'>
                                    <div className = 'userInformation__infoBlock-name coin'> Всего доступно: </div>
                                    <div className = 'userInformation__infoBlock-value'><b>{this.state.providerCoins}</b></div>
                                </div>
                            ) : null
                        }
                        <div className = 'userInformation__infoBlock'>
                            <div className = 'userInformation__infoBlock-name coin'>На счету пользователя: </div>
                            <div className = 'userInformation__infoBlock-value'><b>{this.state.driverCoins}</b></div>
                        </div>
                    </div>
                    <Counter
                        maxVal = {isAdmin ? adminCoins : providerCoins}
                        onSetCounterValue = {this.handleChangeCoins}
                        minVal = {isAdmin ? '' : driverCoins * -1}
                        value = {''}
                    />
                </div>
            </Card>
        );
    }
}

export default SetCoinForm;
