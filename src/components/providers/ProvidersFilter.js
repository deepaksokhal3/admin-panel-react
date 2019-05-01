import React from 'react';
import {
    translate,
    Filter,
    TextInput,
    DateInput
} from 'admin-on-rest';

const ProvidersFilter = translate((props) => {
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
        </Filter>
    );
}
);

export default translate(ProvidersFilter);
