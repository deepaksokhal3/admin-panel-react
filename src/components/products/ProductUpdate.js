import React                 from 'react';
import { Edit }              from 'admin-on-rest';
import { FactoryValidation } from '../../FactoryValidation';
import { rulesForProducts }  from '../ValidationRules';
import ProductTitle          from './ProductTitle';
import ProductCreateForm     from './ProductCreateForm';


function validateProductUpdate(values) {
    return FactoryValidation(values, rulesForProducts);
}

export default function ProductUpdate(props) {
    return (
        <Edit {...props} title = {<ProductTitle  actionName = 'edit' />} >
            <ProductCreateForm onValidateProducts = {validateProductUpdate} isEditForm />
        </Edit>
    );
}
