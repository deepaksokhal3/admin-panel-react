import React                 from 'react';
import { Create }              from 'admin-on-rest';
import { FactoryValidation } from '../../FactoryValidation';
import { rulesForProviders }  from '../ValidationRules';
import { defaultProviderPhoto } from '../../etc/config.json';
import ProvidersCreateForm     from './ProvidersCreateForm';


function validateProviderCreate(values) {
    return FactoryValidation(values, rulesForProviders);
}

export default function ProviderCreate(props) {
    const defaultValuesForm = {
        image : defaultProviderPhoto.split('/images/')[1]
    };

    return (
        <Create {...props}  title='resources.provider.page.create'>
            <ProvidersCreateForm
                {...props}  validate = {validateProviderCreate}
                defaultValuesForm = {defaultValuesForm}
            />
        </Create>
    );
}
