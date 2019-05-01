import React from 'react';
import {
    translate,
    Filter,
    TextInput,
    DateInput,
    SelectInput
} from 'admin-on-rest';
import { orderStatuses } from '../../etc/config.json';

const OrdersFilter = translate((props) => {
    const { translate } = props; //eslint-disable-line

    return (
        <Filter {...props}>
            <TextInput label='resources.searchClient' source='clientSearch' />
            <TextInput label='resources.searchDriver' source='driverSearch' />
            <DateInput
                source = 'createdAt'
                label='resources.createdAt'
                options = {{
                    mode        : 'landscape',
                    cancelLabel : 'Закрыть',
                    locale      : 'ru'
                }}
            />
            <SelectInput
                source='status'
                choices={orderStatuses}
                optionText='label'
                label='resources.drivers.fields.status'
                optionValue = 'value'
            />
        </Filter>
    );
}
);

export default translate(OrdersFilter);
