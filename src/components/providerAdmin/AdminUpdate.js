import React                 from 'react';
import { Edit, SimpleForm }              from 'admin-on-rest';
import { FactoryValidation } from '../../FactoryValidation';
import { rulesForAdmin }  from '../ValidationRules';
import UserTitle from '../users/UserTitle';
import AdminUpdateForm     from './AdminUpdateForm';
import CustomToolbar  from './CustomToolbar';

function validateAdminUpdate(values) {
    return FactoryValidation(values, rulesForAdmin);
}

export default function AdminUpdate(props) {
    return (
        <Edit {...props} title = {<UserTitle actionName = 'edit' />}  >
            <SimpleForm
                validate = {validateAdminUpdate}
                redirect = 'list'
                toolbar={<CustomToolbar />}
            >
                <AdminUpdateForm {...props} isEditForm />
            </SimpleForm>
        </Edit>
    );
}
