import React                 from 'react';
import { Delete }            from 'admin-on-rest';
import ProductTitle          from './ProductTitle';

export default function ProductDelete(props) {
    return (
        <Delete {...props} title={<ProductTitle  actionName='delete' />} />
    );
}

