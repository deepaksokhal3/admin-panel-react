import React, { Component }            from 'react';
import PropTypes                       from 'prop-types';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton                      from 'material-ui/FlatButton';
import { CardActions }                 from 'material-ui/Card';
import { CreateButton, RefreshButton } from 'admin-on-rest';
import SelectField                      from 'material-ui/SelectField';
import MenuItem                         from 'material-ui/MenuItem';
import { updateProvider }          from '../providers/providersActions';

class OrdersActionsComponent extends Component {
    static propTypes = {
        resource         : PropTypes.string,
        filters          : PropTypes.object,
        displayedFilters : PropTypes.object,
        filterValues     : PropTypes.object,
        basePath         : PropTypes.string,
        showFilter       : PropTypes.func,
        onOpenModal      : PropTypes.func.isRequired,
        updateProvider   : PropTypes.func
    }
    static defaultProps = {
        resource         : '',
        filters          : {},
        displayedFilters : {},
        filterValues     : {},
        basePath         : '',
        showFilter       : () => {},
        updateProvider   : () => {}
    }
    state = {
        currency : localStorage.providerCurrency
    }

    handleChange = (event, index, value) => {
        const { currency } = this.state;

        if (currency !== value) {
            this.setState({ currency: value });
            localStorage.providerCurrency = value;
            this.props.updateProvider({ currency: value }, localStorage.providerId);
        }
    }

    render() {
        const { resource,
            filters,
            displayedFilters,
            filterValues,
            basePath,
            showFilter,
            onOpenModal } = this.props;
        const { currency } = this.state;

        return (
            <div>
                <CardActions style={{ display: 'flex' }} >
                    <div>
                        <SelectField
                            style={{
                                width          : 90,
                                'margin-right' : '30px'
                            }}
                            label='resources.provider.currency'
                            name = 'currency'
                            floatingLabelText='Валюта'
                            floatingLabelStyle ={{ color: 'rgb(0, 188, 212)' }}
                            onChange={this.handleChange}
                            value={currency}
                        >
                            <MenuItem value={'BYN'} primaryText='BYN' />
                            <MenuItem value={'RUB'} primaryText='RUB' />
                            <MenuItem value={'UAH'} primaryText='UAH' />
                            <MenuItem value={'KZT'} primaryText='KZT' />
                        </SelectField>
                    </div>
                    <div className='headerMenu'>
                        <FlatButton primary label= 'Отчеты' onClick={onOpenModal} />
                        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
                        <CreateButton basePath={basePath} />
                        <RefreshButton />
                    </div>
                </CardActions>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateProvider : bindActionCreators(updateProvider, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(OrdersActionsComponent);
