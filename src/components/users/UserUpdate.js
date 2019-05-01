import React                 from 'react';
import { Edit, SimpleForm }              from 'admin-on-rest';
import { FactoryValidation } from '../../FactoryValidation';
import { rulesForUsers }     from '../ValidationRules';
import UserTitle             from './UserTitle';
import UserCreateForm        from './UserCreateForm';


function validateUserUpdate(values) {
    return FactoryValidation(values, rulesForUsers);
}

export default function UserUpdate(props) {
    return (
        <Edit {...props} title = {<UserTitle actionName = 'edit' />} >
            <SimpleForm
                validate = {validateUserUpdate}
                redirect = 'list'
            >
                <UserCreateForm {...props} isEditForm />
            </SimpleForm>
        </Edit>
    );
}
