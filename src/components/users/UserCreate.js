import React                 from 'react';
import { Create, SimpleForm }            from 'admin-on-rest';
import { FactoryValidation } from '../../FactoryValidation';
import { rulesForUsers }     from '../ValidationRules';
import UserCreateForm        from './UserCreateForm';


function validateUserCreation(values) {
    const advancedRules = { password: 'required', document: 'required' };

    return FactoryValidation(values, { ...rulesForUsers, ...advancedRules });
}

export default function UserCreate(props) {
    const providerId = localStorage.getItem('providerId');

    return (
        <Create {...props} title='resources.drivers.page.create'>
            <SimpleForm
                validate = {validateUserCreation}
                redirect = 'list'
                defaultValue = {{
                    role    : 'DRIVER',
                    status  : 'ACTIVE',
                    'links' : {
                        'provider' : { 'type': 'provider', 'id': providerId }
                    }
                }}
            >
                <UserCreateForm {...props} />
            </SimpleForm>
        </Create>
    );
}

