import React                 from 'react';
import { Edit }              from 'admin-on-rest';
import { FactoryValidation } from '../../FactoryValidation';
import { rulesForProviders }  from '../ValidationRules';
import ProvidersCreateForm     from './ProvidersCreateForm';
import ProviderTitle            from './ProviderTitle';


function validateProviderUpdate(values) {
    return FactoryValidation(values, rulesForProviders);
}

export default function ProviderUpdate(props) {
    return (
        <Edit {...props}  title = {<ProviderTitle actionName = 'edit' />} >
            <ProvidersCreateForm
                {...props} isEdit validate = {validateProviderUpdate}
            />
        </Edit>
    );
}
