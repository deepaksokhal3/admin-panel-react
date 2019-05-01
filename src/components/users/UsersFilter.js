import React from 'react';
import {
    translate,
    Filter,
    TextInput,
    DateInput,
    SelectInput
} from 'admin-on-rest';
import { userStatuses, isAvailable } from '../../etc/config.json';

const UsersFilter = translate((props) => {
    const { translate } = props; //eslint-disable-line

    return (
        <Filter {...props}>
            <TextInput label='resources.search' source='search' />
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
                choices={userStatuses}
                optionText='status'
                label='resources.drivers.fields.status'
                optionValue = 'value'
            />
            <SelectInput
                source='isAvailable'
                choices={isAvailable}
                optionText='label'
                label='resources.drivers.fields.available'
                optionValue = 'value'
            />
        </Filter>
    );
}
);

export default translate(UsersFilter);
