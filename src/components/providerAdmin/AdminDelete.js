import React                 from 'react';
import { Delete }            from 'admin-on-rest';
import UserTitle          from '../users/UserTitle';

export default function AdminDelete(props) {
    return (
        <Delete {...props} title={<UserTitle  actionName='delete' />} />
    );
}

