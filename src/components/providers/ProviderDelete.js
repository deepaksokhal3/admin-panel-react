import React                 from 'react';
import { Delete }            from 'admin-on-rest';
import ProviderTitle          from './ProviderTitle';

export default function ProviderDelete(props) {
    return (
        <Delete {...props} title={<ProviderTitle  actionName='delete' />} />
    );
}

