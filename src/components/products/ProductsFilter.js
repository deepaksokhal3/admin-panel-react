import React from 'react';
import {
    translate,
    Filter,
    TextInput,
    SelectInput
} from 'admin-on-rest';
import { productTypes } from '../../etc/config.json';

const ProductsFilter = translate((props) => {
    const { translate } = props; //eslint-disable-line

    return (
        <Filter {...props}>
            <TextInput label='resources.search' source='search' />
            <SelectInput
                source='type'
                choices={productTypes}
                optionText='label'
                label='resources.products.type'
                optionValue = 'value'
            />
        </Filter>
    );
}
);

export default translate(ProductsFilter);
