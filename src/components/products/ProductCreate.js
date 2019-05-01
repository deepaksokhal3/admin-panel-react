import React                 from 'react';
import { Create }            from 'admin-on-rest';
import { FactoryValidation } from '../../FactoryValidation';
import { rulesForProducts }     from '../ValidationRules';
import ProductCreateForm     from './ProductCreateForm';


function validateProductCreate(values) {
    return FactoryValidation(values, rulesForProducts);
}

export default function ProductCreate(props) {
    return (
        <Create {...props} title= 'resources.products.page.create' >
            <ProductCreateForm onValidateProducts = {validateProductCreate} isEditForm = {false} />
        </Create>
    );
}
