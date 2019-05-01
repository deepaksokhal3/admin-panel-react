import React                 from 'react';
import { Create }            from 'admin-on-rest';
import OrderCreateForm        from './OrderCreateForm';


export default function OrderCreate(props) {
    return (
        <Create {...props} title='resources.orders.create' >
            <OrderCreateForm   />
        </Create>
    );
}
